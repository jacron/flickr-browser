import {ServiceJustify} from "./service.justify";
import {Injectable} from "@angular/core";
import {ServicePhotoDetails} from "./service.photo-details";
import {ServiceSearch} from "./service.search";
// import apiConfig = require("../api.config");

/**
 * Created by orion on 17/03/2017.
 */

@Injectable()
export class ServicePhotos {
    public photos;
    public photo;
    public index;
    public total;
    public pages;
    public page;
    public perPage;
    public waiting = false;

    constructor(
        private serviceJustify: ServiceJustify,
        private servicePhotoDetails: ServicePhotoDetails,
        private serviceSearch: ServiceSearch,
    ) {}

    public strPerPage() {
        return this.perPage.toString();
    }

    public strPage() {
        return this.page.toString();
    }

    public strPages() {
        return this.pages.toString();
    }

    public addPhoto(photo) {
        this.photos.push(photo);
    }

    public setPhotos(photos) {
        this.photos = photos;
    }

    public justify() {
        this.serviceJustify.processPhotos(this.photos);
    }

    public select(data) {
        this.photo = data.photo;
        this.index = data.index;
    }

    public getOffset() {
        return (this.page - 1) * this.perPage;
    }

    public nextPhoto() {
        if (this.index < this.photos.length - 1) {
            this.index++;
            this.photo = this.photos[this.index];
            this.servicePhotoDetails.addToDetails(this.photo);
        }
    }

    public prevPhoto() {
        if (this.index > 0) {
            this.index--;
            this.photo = this.photos[this.index];
            this.servicePhotoDetails.addToDetails(this.photo);
        }
    }

    public resetPage() {
        this.page = 1;
    }

    public nextPage() {
        if (this.page < this.pages) {
            this.page++;
            return true;
        }
        return false;
    }

    public prevPage() {
        if (this.page > 1) {
            this.page--;
            return true;
        }
        return false;
    }

    public clearPhoto() {
        this.photo = null;
    }

    public initPhotos() {
        this.photos = [];
        this.page = 1;
        this.pages = 1;
        this.perPage = 15;
    }

    public photoOnKey(e) {
        if (this.photo) {
            switch (e.key) {
                case "Escape":
                    this.clearPhoto();
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

    public photosOnKey(e) {
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
    }

    public onKey(e) {
        this.photoOnKey(e);
        this.photosOnKey(e);
    }

    public addFavorites() {
        for (const item of this.photos) {
            this.serviceSearch.getFavorites(item.id, 50).subscribe((response) => {
                if (response) {
                    item.favorites = response.favorites;
                    item.favoritesLen = response.count;
                }
            });
        }
    }

    public getGroupPhotos(id) {
        this.serviceSearch.groupsPoolsGetPhotos(id).subscribe((photos) => {
            this.photos = photos;
            this.justify();
            this.addFavorites();
        });
    }

}
