/**
 * Created by orion on 03/04/2017.
 * Filter
 * Get all my photos taken by iPhone, with lense EF135, etc
 */
import {Component, HostListener, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {getExif} from "../helpers/exif";
import {calcPagesFromTotal, sortAlphaNumAsc} from "../helpers/util";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {ServicePhotos} from "../service/service.photos";
import {ServiceSearch} from "../service/service.search";
import {ServiceStorage} from "../service/service.storage";

const MODELS_IN_STORE = "filter.lensModels";

@Component({
    templateUrl: "../../partials/lenses.html",
    styleUrls: ["../../css/browse.css", "../../css/link.css"],
})
export class LensesComponent implements OnInit {
    public pagesTodo: number;
    public lensModels: string[];
    public selectedLensModel = "";
    public my = true;
    public waiting = false;
    public subscription: Subscription = null;
    public query;

    constructor(
        private serviceSearch: ServiceSearch,
        public servicePhotos: ServicePhotos,
        private serviceStorage: ServiceStorage,
        private serviceAddFavorites: ServiceAddFavorites,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        if (!this.lensModels) {
            this.getLenses();
        }
        this.servicePhotos.initPhotos();
    }

    private retrieveFromStorage() {
        this.lensModels = this.serviceStorage.getJSON(MODELS_IN_STORE);
        console.log("retrieved from storage");
    }

    private persistToStorage() {
        this.serviceStorage.setJSON(MODELS_IN_STORE, this.lensModels);
    }

    private addLense(lensModel) {
        if (this.lensModels.indexOf(lensModel) === -1 && lensModel && lensModel.length !== 0) {
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

    public getLenses() {
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

    private fetchLensModel(init: boolean) {
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)

        if (init) {
            this.servicePhotos.resetPage();
        }
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

    public selectLens(lens) {
       this.selectedLensModel = lens;
       this.fetchLensModel(true);
    }

}
