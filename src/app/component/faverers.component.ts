import {Component, OnInit, OnDestroy} from "@angular/core";
import {ServiceStorage} from "../service/service.storage";
import {ServiceFaverers} from "../service/service.faverers";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {ServiceSearch} from "../service/service.search";
import {prettyNumber} from "../helpers/util";

/**
 * Created by orion on 10/03/2017.
 */

const faverersMinCount = "faverers.minCount";
export const faverersPersons = "faverers.persons";
const faverersFavoritesCount = "faverers.favoritesCount";

@Component({
    templateUrl: "../../partials/faverers.html",
    // template: `hello`,
    styleUrls: ["../../css/faverers.css", "../../css/browse.css", "../../css/link.css"],
})
export class FaverersComponent implements OnInit, OnDestroy {
  public persons = [];
  public favoritesCount: number;
  public waiting = false;
  public my = true;
  public query;
  public person: any;
  private subscription: Subscription = null;
  public minCount = 1;
  public showCounts = false;

  constructor(
        private serviceStorage: ServiceStorage,
        private serviceFaverers: ServiceFaverers,
        private serviceSearch: ServiceSearch,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        if (this.persons) {
            console.log("data fetched from storage");
        } else {
            this.getFaverers();
        }
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private retrieveFromStorage() {
        let minCount = parseInt(this.serviceStorage.get(faverersMinCount), 10);
        if (isNaN(minCount)) {
            minCount = 1;
        }
        let favoritesCount = parseInt(this.serviceStorage.get(faverersFavoritesCount), 10);
        if (isNaN(favoritesCount)) {
            favoritesCount = -1;
        }
        this.minCount = minCount;
        this.favoritesCount = favoritesCount;
        this.persons = this.serviceStorage.getJSON(faverersPersons);
    }

    public storeMinCount() {
        // console.log('storing mincount');
        this.serviceStorage.set(faverersMinCount, this.minCount.toString());
    }

    private persistToStorage() {
        this.serviceStorage.set(faverersMinCount, this.minCount.toString());
        this.serviceStorage.setJSON(faverersPersons, this.persons);
        this.serviceStorage.set(faverersFavoritesCount, this.favoritesCount.toString());
    }

    public navigateToList(nsid) {
        this.serviceStorage.set(faverersMinCount, this.minCount.toString());
        this.router.navigate(["/favererslist", nsid]).then();
    }

    public getFaverers() {
        this.waiting = true;
        this.subscription = this.serviceFaverers.faverers$
            .subscribe((data) => {
                if (data) {
                    this.persons = data.persons;
                    this.favoritesCount = data.favoritesCount;
                    this.persistToStorage();
                    this.waiting = false;
                }
            });
        this.serviceFaverers.getFaverers();
    }

    public getCounts() {
        this.waiting = true;
        let todo = this.persons.length;
        this.persons.map((person) => {
            this.serviceSearch.getUserFavoritesCount(person.nsid).subscribe( (count) => {
                person.favorites_count = prettyNumber(count, ".");
                if (--todo === 0) {
                    this.waiting = false;
                    this.showCounts = true;
                    this.serviceStorage.setJSON("favs.persons", this.persons);
                }
            });

        });

    }

}
