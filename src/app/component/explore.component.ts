import {Component, OnInit, HostListener} from "@angular/core";
import {ServiceStorage} from "../service/service.storage";
import {ServicePhotos} from "../service/service.photos";
import {URLSearchParams} from "@angular/http";
import {ServiceSearch} from "../service/service.search";
import {isoDateToString, stringToIsoDate} from "../helpers/util";
import {ServiceAddFavorites} from "../service/service.add-favorites";

/**
 * Created by orion on 07/03/2017.
 */

const STORAGE_PARMS = "explore.per_page";

@Component({
    templateUrl: "../../partials/explore.html",
    styleUrls: ["../../css/browse.css"],
})
export class ExploreComponent implements OnInit {

    public waiting = false;
    public my = false;
    public date: string;

    constructor(
        private serviceStorage: ServiceStorage,
        private serviceSearch: ServiceSearch,
        public servicePhotos: ServicePhotos,
        private serviceAddFavorites: ServiceAddFavorites,
    ) {}

    public ngOnInit() {
        this.servicePhotos.initPhotos();
        this.servicePhotos.resetPage();
        this.date = "";
        this.retrievePerPageFromStorage();
    }

    private retrievePerPageFromStorage() {
        this.servicePhotos.perPage = parseInt(this.serviceStorage.get(STORAGE_PARMS), 10) || 15;
    }

    private persistPerPageToStorage() {
        this.serviceStorage.set(STORAGE_PARMS, this.servicePhotos.perPage.toString());
    }

    private getExploreDate() {
        this.date = isoDateToString(new Date());
        this.prevDay();
    }

    public prevDay() {
        if (this.date === "") {
            this.getExploreDate();
        }
        const d = stringToIsoDate(this.date);
        d.setDate(d.getDate() - 1);
        this.date = isoDateToString(d);
        this.explore(true);
    }

    public nextDay() {
        if (this.date === "") {
            return;
        }
        const d = stringToIsoDate(this.date);
        d.setDate(d.getDate() + 1);
        this.date = isoDateToString(d);
        this.explore(true);
    }

    public voidDate() {
        this.date = "";
        this.explore(true);
    }

    public prevPage() {
        if (this.servicePhotos.prevPage()) {
            this.explore(false);
        }
    }

    public nextPage() {
        if (this.servicePhotos.nextPage()) {
            this.explore(false);
        }
    }

    public closeDetails() {
        this.servicePhotos.clearPhoto();
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

    public selectPhoto(data) {
        this.servicePhotos.select(data);
        document.getElementById("top").scrollIntoView();
    }

    public nextPhoto() {
        this.servicePhotos.nextPhoto();
    }

    public prevPhoto() {
        this.servicePhotos.prevPhoto();
    }

    private addFavorites() {
        this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
    }

    public explore(init: boolean) {
        this.waiting = true;
        if (init) {
            this.servicePhotos.resetPage();
        }
        this.closeDetails();
        const searchParams = new URLSearchParams();
        searchParams.append("per_page", this.servicePhotos.strPerPage());
        searchParams.append("page", this.servicePhotos.strPage());
        if (this.date !== "") {
            searchParams.append("date", this.date);
        }
        this.serviceSearch.explore(searchParams)
            .subscribe((data) => {
                this.servicePhotos.photos = data.items;
                this.servicePhotos.total = data.total;
                this.servicePhotos.pages = data.pages;
                this.servicePhotos.justify();
                this.addFavorites();
                this.waiting = false;
                this.persistPerPageToStorage();
            } );
    }

}
