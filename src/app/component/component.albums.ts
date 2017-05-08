/**
 * Created by orion on 20/03/2017.
 */
import {Component, HostListener} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {ownNsid} from "../api.config";
import {ServicePhotos} from "../service/service.photos";
import {ServiceSearch} from "../service/service.search";
import {ServiceStorage} from "../service/service.storage";
import {photoSrc} from "../helpers/urls";
@Component({
    templateUrl: "../../partials/albums.html",
    styleUrls: ["../../css/closer.css", "../../css/album.css", "../../css/browse.css"],
})
export class AlbumsComponent {
    public albums: any = [];
    public waiting: boolean = false;
    public my: boolean = true;
    public selectedAlbum: any;

    constructor(
        private serviceStorage: ServiceStorage,
        private serviceSearch: ServiceSearch,
        private servicePhotos: ServicePhotos,
        private sanatizer: DomSanitizer,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        this.servicePhotos.initPhotos();
        this.servicePhotos.resetPage();
        this.sanatizeSrc();
    }

    private sanatizeSrc() {
        // Nodig omdat src in een dynamisch style element (background-image) wordt geplaatst.
        for (const album of this.albums) {
            if (album.src) {
                album.src = this.sanatizer.bypassSecurityTrustStyle(
                    "url(" + album.src + ")");
            }
        }
    }
    private retrieveFromStorage() {
        this.albums = this.serviceStorage.getJSON("albums.albums");
    }

    private persistAlbumsToStorage() {
        this.serviceStorage.setJSON("albums.albums", this.albums);
    }

    public fetchPhotos(album) {
        this.selectedAlbum = album;
        this.serviceSearch.getAlbumPhotos(album.id).subscribe((data) => {
            // console.log(data.photo);
            this.servicePhotos.setPhotos(data.photo.map((item) => {
                // console.log(item);
                item.owner = ownNsid;  // dirty hack, but effective to make buddy data
                return item;
            }));
            this.servicePhotos.total = data.total;
            this.servicePhotos.pages = data.pages;
            this.servicePhotos.justify();
            this.servicePhotos.addFavorites();
        });
    }

    private prevPage() {
        if (this.servicePhotos.prevPage()) {
            this.search(false);
        }
    }
    private nextPage() {
        if (this.servicePhotos.nextPage()) {
            this.search(false);
        }
    }

    public close() {
        this.servicePhotos.initPhotos();
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

    public search(init: boolean) {
        this.waiting = true;
        if (init) {
            this.servicePhotos.resetPage();
        }
        this.servicePhotos.initPhotos();
        this.serviceSearch.getMyAlbums().subscribe((albums) => {
            this.servicePhotos.initPhotos();
            let albumsLen = albums.length;
            for (const album of albums) {
                album.name = album.title._content;
                this.serviceSearch.getPrimaryAlbumPhoto(album.id).subscribe(((data) => {
                    if (data.primary) {
                        album.src = photoSrc(data.primary);
                    } else {
                        album.src = null;
                    }
                    album.count = data.count;
                    if (--albumsLen === 0) {
                        this.albums = albums;
                        this.persistAlbumsToStorage();
                        this.sanatizeSrc();
                    }
                }));
            }
            this.waiting = false;
        });
    }

}
