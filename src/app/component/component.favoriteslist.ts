/**
 * Created by orion on 13/03/2017.
 */
import {Component, OnInit, OnDestroy, HostListener} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ServiceStorage} from "../service/service.storage";
import {ServiceFavoritesList} from "../service/service.favoriteslist";
import {Subscription} from "rxjs";
import {PersonModel} from "../model/model.person";
import {ServicePhotos} from "../service/service.photos";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {favoritesPersons} from "./component.favorites";
import {ServiceFavorites} from "../service/service.favorites";

@Component({
    templateUrl: "../../partials/favoriteslist.html",
    styleUrls: ["../../css/closer.css", "../../css/link.css"],
})
export class FavoritesListComponent implements OnInit, OnDestroy {
    private sub: any;
    public nsid: string;
    public persons: PersonModel[];
    public my: boolean = true;  // work-around to avoid owner icons
    private subscriptionFavoritesList: Subscription = null;
    public waiting: boolean= false;
    public message= {
        text: "Hello!",
        type: "alert",
        show: false,
    };
    private subscription: Subscription = null;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private serviceStorage: ServiceStorage,
        private serviceFavoritesList: ServiceFavoritesList,
        private servicePhotos: ServicePhotos,
        private serviceAddFavorites: ServiceAddFavorites,
        private serviceFavorites: ServiceFavorites,
    ) {}

    public ngOnInit() {
        this.waiting = true;
        this.servicePhotos.initPhotos();
        this.sub = this.activatedRoute.params.subscribe((params) => {
            /* tslint:disable:no-string-literal */
            this.nsid = params["nsid"];
            this.retrieveFromStorage();
            this.personPhotos();
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private retrieveFromStorage() {
        this.persons = this.serviceStorage.getJSON(favoritesPersons);
    }

    @HostListener("window:keydown", ["$event"])
    public onKey(e) {
        this.servicePhotos.photoOnKey(e);
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize() {
        this.servicePhotos.justify();
    }

    public close() {
        this.router.navigate(["/favorites"]).then();
    }

    private getPerson() {
        // return this.persons.filter((person) => person.nsid === this.nsid);
        for (const person of this.persons) {
            if (person.nsid === this.nsid) {
                // console.log(person);
                return person;
            }
        }
        return null;
    }

    private addFavorites() {
        this.subscription = this.serviceAddFavorites.stream$.subscribe((response) => {
            if (response) {
                this.waiting = false;
            }
        });
        this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
    }

    public personPhotos() {
        const person = this.getPerson();
        if (person) {
            this.waiting = true;
            this.subscriptionFavoritesList = this.serviceFavoritesList.faveritesList$
                .subscribe((photos) => {
                    if (photos) {
                        photos.sort((a, b) => {
                            if (a.favedate > b.favedate) {
                                return 1;
                            }
                            if (a.favedate < b.favedate) {
                                return -1;
                            }
                            return 0;
                        });
                        this.servicePhotos.setPhotos(photos);
                        this.servicePhotos.justify();
                        this.addFavorites();
                    }
                });
            this.serviceFavoritesList.getPersonPhotos(person.items);
        } else {
            this.message.text = "Er zijn geen favorieten voor deze persoon";
            this.message.show = true;
            this.waiting = false;
        }
    }

    public refreshFavorites() {
        this.waiting = true;
        this.subscription = this.serviceFavorites.faverites$
            .subscribe((data) => {
                if (data) {
                    this.serviceStorage.setJSON(favoritesPersons, data.persons);
                    this.persons = data.persons;
                    this.personPhotos();
                    // this.waiting = false;
                }
            });
        this.serviceFavorites.getFavorites();
    }

}
