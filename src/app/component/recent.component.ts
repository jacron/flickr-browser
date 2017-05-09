import {Component, OnInit, HostListener} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {URLSearchParams} from "@angular/http";
import {ServiceStorage} from "../service/service.storage";
import {ServiceJustify} from "../service/service.justify";
import {ServicePhotoDetails} from "../service/service.photo-details";
import {flickrUrls} from "../helpers/urls";
/**
 * Created by orion on 07/03/2017.
 */

@Component({
    templateUrl: "../../partials/recent.html",
    styleUrls: ["../../css/browse.css"],
})

export class RecentComponent implements OnInit {
    constructor(
        private serviceSearch: ServiceSearch,
        private serviceStorage: ServiceStorage,
        private serviceJustify: ServiceJustify,
        private servicePhotoDetails: ServicePhotoDetails,
    ) {}

    public photos;
    public photo;
    public photoIndex: number;
    public count: number;
    public page: number;
    public date: string;
    public total: string;
    public pages: number;
    public mine: boolean;
    public waiting: boolean = false;

    public ngOnInit() {
        this.retrieveFromStorage();
        this.page = 1;
    }

    private retrieveFromStorage() {
        this.count = parseInt(this.serviceStorage.get("recent.count"), 10) || 15;
        this.date = this.serviceStorage.get("recent.date") || "";
    }

    private persistToStorage() {
        this.serviceStorage.set("recent.count", this.count.toString());
        this.serviceStorage.set("recent.date", this.date);
    }

    public prevPage() {
        this.page--;
        this.search(false);
    }

    public nextPage() {
        this.page++;
        this.search(false);
    }

    public closeDetails() {
        this.photo = null;
    }

    @HostListener("window:keydown", ["$event"])
    public onKey(e) {
        if (!this.photo && e.target.localName !== "input") {
            switch (e.key) {
                case "ArrowRight":
                    this.nextPage();
                    break;
                case "ArrowLeft":
                    this.prevPage();
                    break;
            }
        }
        if (this.photo) {
            switch (e.key) {
                case "Escape":
                    this.closeDetails();
                    break;
                case "ArrowRight":
                    this.nextPhoto();
                    break;
                case "ArrowLeft":
                    this.prevPhoto();
                    break;
            }
        }
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize() {
        this.serviceJustify.processPhotos(this.photos);
    }

    public selectPhoto(data) {
        this.photo = data.photo;
        this.photoIndex = data.index;
        document.getElementById("top").scrollIntoView();
    }
    public nextPhoto() {
        if (this.photoIndex < this.photos.length - 1) {
            this.photoIndex++;
            this.photo = this.photos[this.photoIndex];
            this.servicePhotoDetails.addToDetails(this.photo);
        }
    }
    public prevPhoto() {
        if (this.photoIndex > 0) {
            this.photoIndex--;
            this.photo = this.photos[this.photoIndex];
            this.servicePhotoDetails.addToDetails(this.photo);
        }
    }
    private initSearchParams(): URLSearchParams {
        const searchParams = new URLSearchParams();
        searchParams.append("per_page", this.count.toString());
        searchParams.append("page", this.page.toString());
        searchParams.append("extras", flickrUrls.extra.full);
        return searchParams;
    }

    public search(init: boolean) {
        this.waiting = true;
        if (init) {
            this.page = 1;
        }
        this.photo = null;
        this.persistToStorage();
        this.serviceSearch.getRecent(this.initSearchParams())
            .subscribe((data) => {
                this.photos = data.items;
                this.total = data.total;
                this.pages = data.pages;
                this.waiting = false;
                this.serviceJustify.processPhotos(this.photos);
            } );
    }
}
