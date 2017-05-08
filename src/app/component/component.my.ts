import {Component, OnInit, HostListener} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {ServiceStorage} from "../service/service.storage";
import {URLSearchParams} from "@angular/http";
import {ServicePhotos} from "../service/service.photos";
import {Subscription} from "rxjs";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {ServiceAddComments} from "../service/service.add-comments";
import {flickrUrls} from "../helpers/urls";
/**
 * Created by orion on 10/03/2017.
 */

@Component({
    templateUrl: "../../partials/my.html",
    styleUrls: [ "../../css/browse.css" ],
})
export class MyComponent implements OnInit {
    constructor(
        private serviceSearch: ServiceSearch,
        private serviceStorage: ServiceStorage,
        private servicePhotos: ServicePhotos,
        private serviceAddFavorites: ServiceAddFavorites,
        private serviceAddComments: ServiceAddComments,
    ) {}

    public categoryOptions = [
        { value: "faves", name: "faves" },
        { value: "views", name: "views" },
        { value: "comments", name: "comments" },
        { value: "interesting", name: "in" +
        "teresting" },
    ];
    public category: string;
    public my: boolean = true;
    public waiting: boolean = false;
    private subscriptionFav: Subscription = null;
    private subscriptionCom: Subscription = null;

    public ngOnInit() {
        this.servicePhotos.initPhotos();
        this.servicePhotos.resetPage();
        this.retrieveFromStorage();
        // console.log(this.servicePhotos.photos);
        // this.servicePhotos.justify();
        this.search(true);
    }

    private retrieveFromStorage() {
        this.servicePhotos.perPage = parseInt(this.serviceStorage.get("my.per_page"), 10) || 15;
        this.category = this.serviceStorage.get("my.category") || "interesting";
        // this.servicePhotos.setPhotos(this.serviceStorage.getJSON('my.photos'));
        // this.servicePhotos.pages = this.serviceStorage.get('my.pages');
        // this.servicePhotos.total = this.serviceStorage.get('my.total');
    }

    private persistToStorage() {
        this.serviceStorage.set("my.per_page", this.servicePhotos.strPerPage());
        this.serviceStorage.set("my.category", this.category);
        this.serviceStorage.setJSON("my.photos", this.servicePhotos.photos);
        this.serviceStorage.set("my.pages", this.servicePhotos.pages);
        this.serviceStorage.set("my.total", this.servicePhotos.total);
    }

    private initSearchParams(): URLSearchParams {
        const searchParams = new URLSearchParams();
        searchParams.append("per_page", this.servicePhotos.strPerPage());
        searchParams.append("page", this.servicePhotos.strPage());
        searchParams.append("sort", this.category);
        searchParams.append("extras", flickrUrls.extra.full);
        return searchParams;
    }

    public prevPage() {
        if (this.servicePhotos.prevPage()) {
            this.search(false);
        }
    }
    public nextPage() {
        if (this.servicePhotos.nextPage()) {
            this.search(false);
        }
    }
    public closeDetails() {
        this.servicePhotos.clearPhoto();
    }

    @HostListener("window:keydown", ["$event"])
    public onKey(e) {
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
        this.servicePhotos.photoOnKey(e);
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize() {
        this.servicePhotos.justify();
    }

    private addFavorites() {
        this.subscriptionFav = this.serviceAddFavorites.stream$.subscribe((response) => {
            if (response) {
                this.serviceStorage.setJSON("my.photos", this.servicePhotos.photos);
            }
        });
        this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
    }

    private addComments() {
        this.subscriptionCom = this.serviceAddComments.stream$.subscribe(() => {
            // if (response) {
            //     console.log(response);
            // }
        });
        this.serviceAddComments.addComments(this.servicePhotos.photos);
    }

    public search(init: boolean) {
        this.waiting = true;
        if (init) {
            this.servicePhotos.resetPage();
        }
        this.servicePhotos.clearPhoto();
        this.serviceSearch.getMyPopular(this.initSearchParams())
            .subscribe((data) => {
                // bug in api: total always is same as per_page, pages always is one
                this.servicePhotos.photos = data.items;
                this.servicePhotos.total = data.total;
                let pages = data.pages;
                if (pages === 1) {// bug in api
                    pages = 999;
                }
                this.servicePhotos.pages = pages;
                this.waiting = false;
                this.servicePhotos.justify();
                this.addFavorites();
                this.addComments();
                this.persistToStorage();
            } );
    }

    public nextScrolledPage() {
        console.log("scrolled...");
        // this.after += this.count;
        // this.fetchPage();
    }

}
