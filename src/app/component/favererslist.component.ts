import {Component, OnInit, OnDestroy, HostListener} from "@angular/core";
import {ServiceStorage} from "../service/service.storage";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ServicePhotos} from "../service/service.photos";
import {ServiceFavoritesList} from "../service/service.favoriteslist";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {
    sort_direction, sort_type, sortField,
} from "../helpers/util";
import {faverersPersons} from "./faverers.component";
import {favoritesPersons} from "./favorites.component";
import {ServiceFavorites} from "../service/service.favorites";

/**
 * Created by orion on 10/03/2017.
 */
@Component({
    templateUrl: "../../partials/favererslist.html",
    styleUrls: ["../../css/closer.css", "../../css/favererslist.css", "../../css/link.css"],
})
export class FaverersListComponent implements OnInit, OnDestroy {
  private sub: any;
  private subscription: Subscription = null;
  private subscriptionFavoritesList: Subscription = null;
  public message= {
    text: "Hello!",
    type: "alert",
    show: false,
  };
  public favorites: any[];
  public nsid: string;
  public waiting = false;
  public my = true;
  public persons;
    constructor(
        private serviceStorage: ServiceStorage,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servicePhotos: ServicePhotos,
        private serviceFavoritesList: ServiceFavoritesList,
        private serviceAddFavorites: ServiceAddFavorites,
        private serviceFavorites: ServiceFavorites,
    ) {}



    public ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe((params) => {
            /* tslint:disable:no-string-literal */
            this.nsid = params["nsid"];
            this.retrieveFromStorage();
            this.getFavPhotos();
            this.getFavorites();
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscriptionFavoritesList) {
            this.subscriptionFavoritesList.unsubscribe();
        }
    }

    private getPerson() {
        for (const person of this.persons) {
            if (person.nsid === this.nsid) {
                return person;
            }
        }
    }

    private addFavorites() {
        this.subscription = this.serviceAddFavorites.stream$.subscribe((response) => {
            if (response) {
                this.waiting = false;
            }
        });
        this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
    }

    private retrieveFromStorage() {
        this.persons = this.serviceStorage.getJSON(faverersPersons);
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
        this.router.navigate(["/faverers"]).then();
    }

    private personPhotos() {
        this.subscriptionFavoritesList = this.serviceFavoritesList.faveritesList$
            .subscribe((photos) => {
                if (photos) {
                    sortField(photos, "favedate", sort_direction.Asc, sort_type.Alphanum);
                    this.servicePhotos.setPhotos(photos);
                    this.servicePhotos.justify();
                    this.addFavorites();
                }
            });
        this.serviceFavoritesList.getPersonPhotos(this.getPerson().items);
    }

    private getFavPhotos() {
        this.servicePhotos.initPhotos();
        this.personPhotos();
    }

    private setFavorites(persons) {
        this.favorites = [];
        if (persons.length > 0) {
            this.favorites = persons[0].items;
        }
    }

    private getFavorites() {
        const persons = this.serviceStorage.getJSON(favoritesPersons).filter(
            (person) => person.nsid === this.nsid,
        );
        this.setFavorites(persons);
    }

    public refreshFavorites() {
        this.waiting = true;
        this.subscription = this.serviceFavorites.faverites$
            .subscribe((data) => {
                if (data) {
                    this.serviceStorage.setJSON(favoritesPersons, data.persons);
                    this.getFavorites();
                    this.waiting = false;
                }
            });
        this.serviceFavorites.getFavorites();
    }

}
