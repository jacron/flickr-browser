/**
 * Created by orion on 03/04/2017.
 * Filter
 * Get all my photos taken by iPhone, with lense EF135, etc
 */
import {Component, HostListener} from "@angular/core";
import {Subscription} from "rxjs";
import {getExif} from "../helpers/exif";
import {calcPagesFromTotal, sortAlphaNumAsc} from "../helpers/util";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {ServicePhotos} from "../service/service.photos";
import {ServiceSearch} from "../service/service.search";
import {ServiceStorage} from "../service/service.storage";

const MODELS_IN_STORE = "filter.lensModels";
const CAMERAS_IN_STORE = "filter.cameras";

@Component({
    templateUrl: "./partials/filter.html",
    styleUrls: ["./css/browse.css"],
})
export class FilterComponent {
    public pagesTodo: number;
    public lensModels: string[];
    public cameras: string[];
    public selectedLensModel: string = "";
    public selectedCamera: string = "";
    public my: boolean = true;
    public waiting: boolean = false;
    public subscription: Subscription = null;

    constructor(
        private serviceSearch: ServiceSearch,
        private servicePhotos: ServicePhotos,
        private serviceStorage: ServiceStorage,
        private serviceAddFavorites: ServiceAddFavorites,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        if (!this.lensModels) {
            this.getLenses();
        }
        if (!this.cameras) {
            this.getCameras();
        }
        this.servicePhotos.initPhotos();
    }

    private retrieveFromStorage() {
        this.lensModels = this.serviceStorage.getJSON(MODELS_IN_STORE);
        this.cameras = this.serviceStorage.getJSON(CAMERAS_IN_STORE);
        console.log("retrieved from storage");
    }

    private persistToStorage() {
        this.serviceStorage.setJSON(MODELS_IN_STORE, this.lensModels);
        this.serviceStorage.setJSON(CAMERAS_IN_STORE, this.cameras);
    }

    private addLense(lensModel) {
        if (this.lensModels.indexOf(lensModel) === -1 && lensModel.length !== 0) {
            // console.log(lenseModel);
            this.lensModels.push(lensModel);
        }
    }

    private addToLenses(photos) {
        let photosTodo = photos.length;
        for (const photo of photos) {
            this.serviceSearch.getExif(photo.id).subscribe((data) => {
                if (data) {
                    const xExif = getExif(data.exif, data.camera);
                    // console.log(x_exif);
                    this.addLense(xExif.lensModel);
                }
                if (--photosTodo === 0) {
                    if (--this.pagesTodo === 0) {
                        sortAlphaNumAsc(this.lensModels);
                        this.persistToStorage();
                        this.waiting = false;
                    }
                }
            });
        }
    }

    private addCamera(camera) {
        if (this.cameras.indexOf(camera) === -1 && camera.length !== 0) {
            this.cameras.push(camera);
        }
    }

    private addToCameras(photos) {
        let photosTodo = photos.length;
        for (const photo of photos) {
            this.serviceSearch.getExif(photo.id).subscribe((data) => {
                if (data) {
                    this.addCamera(data.camera);
                }
                if (--photosTodo === 0) {
                    if (--this.pagesTodo === 0) {
                        sortAlphaNumAsc(this.cameras);
                        this.persistToStorage();
                        this.waiting = false;
                    }
                }
            });
        }
    }

    private getLenses() {
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)

        this.serviceSearch.myPhotosTotal().subscribe((total) => {
            if (total) {
                this.waiting = true;
                const pages = calcPagesFromTotal(total, perPage);

                this.pagesTodo = pages;
                for (let i = 0; i < pages; i++) {
                    this.lensModels = [];
                    this.serviceSearch.myPhotosPage(i + 1, perPage, false).subscribe((photos) => {
                        if (photos && photos.photo.length > 0) {
                            this.addToLenses(photos.photo);
                        } else {
                            console.log("empty result");
                        }
                    });
                }
            }
        });
    }

    private getCameras() {
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)

        this.serviceSearch.myPhotosTotal().subscribe((total) => {
            if (total) {
                this.waiting = true;
                const pages = calcPagesFromTotal(total, perPage);

                this.pagesTodo = pages;
                for (let i = 0; i < pages; i++) {
                    this.cameras = [];
                    this.serviceSearch.myPhotosPage(i + 1, perPage, false).subscribe((photos) => {
                        if (photos && photos.photo.length > 0) {
                            this.addToCameras(photos.photo);
                        } else {
                            console.log("empty result");
                        }
                    });
                }
            }
        });
    }

    public prevPage() {
        if (this.servicePhotos.prevPage()) {
            this.fetchLensModel(false);
        }
    }
    public nextPage() {
        if (this.servicePhotos.nextPage()) {
            this.fetchLensModel(false);
        }
    }
    @HostListener("window:keydown", ["$event"])
    public onKey(e) {
        this.servicePhotos.photoOnKey(e);
        if (!this.servicePhotos.photo && e.target.localName !== "input") {
            switch (e.key) {
                case "ArrowRight":
                    this.nextPage();
                    break;
                case "ArrowLeft":
                    this.prevPage();
                    break;
            }
        }
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize() {
        this.servicePhotos.justify();
    }

    private addFavorites() {
        this.subscription = this.serviceAddFavorites.stream$.subscribe((response) => {
            if (response) {
                this.waiting = false;
            }
        });
        this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
    }

    private filterPhotosOnLens(photos) {
        let photosTodo = photos.length;
        for (const photo of photos) {
            this.serviceSearch.getExif(photo.id).subscribe((data) => {
                if (data) {
                    const xExif = getExif(data.exif, data.camera);
                    if (xExif.lensModel === this.selectedLensModel) {
                        this.servicePhotos.addPhoto(photo);
                    }
                }
                if (--photosTodo === 0) {
                    if (--this.pagesTodo === 0) {
                        if (this.servicePhotos.photos.length > 1) {
                            this.servicePhotos.justify();
                        }
                        this.addFavorites();
                    }
                }
            });
        }
    }

    private filterPhotosOnCamera(photos) {
        let photosTodo = photos.length;
        for (const photo of photos) {
            this.serviceSearch.getExif(photo.id).subscribe((data) => {
                if (data) {
                    if (data.camera === this.selectedCamera) {
                        this.servicePhotos.addPhoto(photo);
                    }
                }
                if (--photosTodo === 0) {
                    if (--this.pagesTodo === 0) {
                        if (this.servicePhotos.photos.length > 1) {
                            this.servicePhotos.justify();
                        }
                        this.addFavorites();
                    }
                }
            });
        }
    }

    private fetchLensModel(init: boolean) {
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)

        if (init) {
            this.servicePhotos.resetPage();
        }
        this.selectedCamera = null;
        this.serviceSearch.myPhotosTotal().subscribe((total) => {
            if (total) {
                this.waiting = true;
                const pages = calcPagesFromTotal(total, perPage);

                this.pagesTodo = pages;
                this.servicePhotos.initPhotos();
                for (let i = 0; i < pages; i++) {
                    this.serviceSearch.myPhotosPage(i + 1, perPage, true).subscribe((photos) => {
                        if (photos && photos.photo.length > 0) {
                            this.filterPhotosOnLens(photos.photo);
                        } else {
                            console.log("empty result");
                        }
                    });
                }
            }
        });
    }

    public fetchCamera(init: boolean) {
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)

        if (init) {
            this.servicePhotos.resetPage();
        }
        this.selectedLensModel = null;
        this.serviceSearch.myPhotosTotal().subscribe((total) => {
            if (total) {
                this.waiting = true;
                const pages = calcPagesFromTotal(total, perPage);

                this.pagesTodo = pages;
                this.servicePhotos.initPhotos();
                for (let i = 0; i < pages; i++) {
                    this.serviceSearch.myPhotosPage(i + 1, perPage, true).subscribe((photos) => {
                        if (photos && photos.photo.length > 0) {
                            this.filterPhotosOnCamera(photos.photo);
                        } else {
                            console.log("empty result");
                        }
                    });
                }
            }
        });

    }

}
