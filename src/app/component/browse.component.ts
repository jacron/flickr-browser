/**
 * Created by orion on 03/03/2017.
 */
import {Component, HostListener, OnInit} from "@angular/core";
import {History} from "../helpers/history";
import {ServiceSearch} from "../service/service.search";
import {ServiceSearchSettings} from "../service/service.searchsettings";
import {ServiceStorage} from "../service/service.storage";
import {Subscription} from "rxjs/Subscription";
// import {sort_direction, sort_type, sortField} from "../helpers/util";
import {ServicePhotos} from "../service/service.photos";
import {searchSortOptions} from "../api.config";
import {ServiceAddComments} from "../service/service.add-comments";

@Component({
  templateUrl: "../../partials/browse.html",
  styleUrls: [
    "../../css/browse.css",
  ],
})

export class BrowseComponent implements OnInit {

  public waiting = false;
  public offset = 0;
  public history: History;
  public cardViewExpanded = true;
  public historyViewExpanded = false;
  public sSortOptions = searchSortOptions;
  public message = {
    text: "Hello!",
    type: "alert",
    show: false,
  };
  // public subscription: Subscription = null;
  private subscriptionCom: Subscription = null;

  constructor(private serviceSearch: ServiceSearch,
              private serviceStorage: ServiceStorage,
              public searchSettings: ServiceSearchSettings,
              public servicePhotos: ServicePhotos,
              private serviceAddComments: ServiceAddComments,
   ) {
    this.history = new History();
  }

  public ngOnInit() {
    this.retrieveFromStorage();
    this.servicePhotos.initPhotos();
    this.servicePhotos.resetPage();
    this.servicePhotos.justify();
    this.cardViewExpanded = true;
    this.fetch(true);
  }

  public resetQuery(focusable) {
    focusable.focus();
    this.searchSettings.text = "";
  }

  public toggleHistoryView() {
    this.historyViewExpanded = !this.historyViewExpanded;
  }

  private persistPhotosToStorage() {
    this.serviceStorage.setJSON("browse.photos", this.servicePhotos.photos);
    this.serviceStorage.set("browse.total", this.servicePhotos.total);
    this.serviceStorage.set("browse.pages", this.servicePhotos.strPages());
  }

  private persistToStorage() {
    this.searchSettings.persistToStorage();
    this.serviceStorage.set("browse.per_page", this.servicePhotos.perPage);
    this.serviceStorage.setJSON("browse.history", this.history.getItems());
  }

  // private retrievePhotosFromStorage() {
  //   this.servicePhotos.photos = this.serviceStorage.getJSON("browse.photos");
  //   if (this.servicePhotos.photos) {
  //     console.log("retrieved photos");
  //     this.servicePhotos.total = this.serviceStorage.get("browse.total");
  //     this.servicePhotos.pages = +this.serviceStorage.get("browse.pages");
  //   }
  // }

  private retrieveFromStorage() {
    this.searchSettings.retrieveFromStorage();
    this.history.setItems(this.serviceStorage.getJSON("browse.history"));
    this.servicePhotos.perPage = this.serviceStorage.get("browse.per_page") || 30;
  }

  private insertHistory(text: string) {
    this.history.insertItem(text);
  }

  // private sortViewSort(items) {
  //   if (this.searchSettings.viewSort === "views") {
  //     return sortField(items, "views", sort_direction.Asc, sort_type.Int);
  //   } else if (this.searchSettings.viewSort === "-views") {
  //     return sortField(items, "views", sort_direction.Desc, sort_type.Int);
  //   }
  //   return items;
  // }

  public selectPhoto(data) {
    this.servicePhotos.select(data);
  }

  @HostListener("window:keydown", ["$event"])
  public onKey(e) {
    this.servicePhotos.photoOnKey(e);
  }

  @HostListener("window:resize", ["$event.target"])
  public onResize() {
    this.servicePhotos.justify();
  }

  public openHistoryItem(item) {
    this.searchSettings.text = item.text;
    this.fetch(true);
  }

  public removeHistoryItem(item) {
    this.history.remove(item);
    this.serviceStorage.setJSON("browse.history", this.history.getItems());
  }

  private addFavorites(photos) {
    let photosLen = photos.length;
    for (const item of photos) {
      this.serviceSearch.getFavorites(item.id, 50).subscribe((response) => {
        if (response) {
          item.favorites = response.favorites;
          item.favoritesLen = response.count;
          if (--photosLen === 0) {
            this.persistPhotosToStorage();
          }
        }
      });
    }
  }

  private addComments() {
    this.subscriptionCom = this.serviceAddComments.stream$.subscribe(() => {});
    this.serviceAddComments.addComments(this.servicePhotos.photos);
  }

  public search() {
    const searchParams = this.searchSettings.getSearchParams();
    searchParams.append("per_page", this.servicePhotos.perPage);
    searchParams.append("page", this.servicePhotos.page);
    this.serviceSearch.search(searchParams)
      .subscribe((data) => {
        if (data.items) {
          this.servicePhotos.photos = this.servicePhotos.photos.concat(data.items);
          // this.sortViewSort(data.items);
          this.servicePhotos.total = data.total;
          this.servicePhotos.pages = data.pages;
          this.servicePhotos.justify();
          this.addFavorites(this.servicePhotos.photos);
          this.addComments();
        } else {
          console.log(data);
        }
        this.waiting = false;
      });
  }

  private initSearch(init: boolean) {
    if (init) {
      this.servicePhotos.initPhotos();
      const t = this.searchSettings.text;
      if (t && t !== " " && t !== "") {
        this.insertHistory(this.searchSettings.text);
      }
    }
    this.servicePhotos.clearPhoto();
    this.persistToStorage();
  }

  public fetch(init: boolean) {
    this.waiting = true;
    this.initSearch(init);
    this.search();
  }

  public nextScrolledPage() {
    if (this.servicePhotos.nextPage()) {
      this.search();
    }
  }

}
