import {Component, OnInit, OnDestroy} from "@angular/core";
// import apiConfig = require("../api.config");
import {ServiceStorage} from "../service/service.storage";
import {ServiceFavorites} from "../service/service.favorites";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

/**
 * Created by orion on 13/03/2017.
 */

const favoritesMinCount = "favorites.minCount";
export const favoritesPersons = "favorites.persons";
const favoritesFavoritesCount = "favorites.favoritesCount";

@Component({
  templateUrl: "../../partials/favorites.html",
  styleUrls: ["../../css/browse.css", "../../css/faverers.css"],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public persons: any[];
  public favoritesCount: number;
  public minCount: number;
  private subscription: Subscription = null;
  public waiting = false;

  constructor(
    private serviceStorage: ServiceStorage,
    private serviceFavorites: ServiceFavorites,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    this.retrieveFromStorage();
    if (this.persons) {
      console.log("retrieved from storage");
    } else {
      this.search();
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public navigateToList(nsid) {
    this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
    this.router.navigate(["/favoritelist", nsid]).then();
  }

  private retrieveFromStorage() {
    let minCount = parseInt(this.serviceStorage.get(favoritesMinCount), 10);
    if (isNaN(minCount)) {
      minCount = 1;
    }
    let favoritesCount = parseInt(this.serviceStorage.get(favoritesFavoritesCount), 10);
    if (isNaN(favoritesCount)) {
      favoritesCount = -1;
    }
    this.persons = this.serviceStorage.getJSON(favoritesPersons) || [];
    this.minCount = minCount;
    this.favoritesCount = favoritesCount;
  }

  public storeMinCount() {
    // console.log('storing mincount');
    if (this.minCount) {
      this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
    }
  }

  private persistToStorage() {
    this.serviceStorage.setJSON(favoritesPersons, this.persons);
    this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
    this.serviceStorage.set(favoritesFavoritesCount, this.favoritesCount.toString());
  }

  public search() {
    this.waiting = true;
    this.subscription = this.serviceFavorites.faverites$
      .subscribe((data) => {
        if (data) {
          this.persons = data.persons;
          this.favoritesCount = data.favoritesCount;
          this.persistToStorage();
          this.waiting = false;
        }
      });
    this.serviceFavorites.getFavorites();
  }

}
