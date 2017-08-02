import {Component, OnInit, HostListener} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {ServiceStorage} from "../service/service.storage";
import {URLSearchParams} from "@angular/http";
import {ServicePhotos} from "../service/service.photos";
import {Subscription} from "rxjs/Subscription";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {ServiceAddComments} from "../service/service.add-comments";
import {flickrUrls} from "../helpers/urls";
/**
 * Created by orion on 10/03/2017.
 */

@Component({
  templateUrl: "../../partials/my.html",
  styleUrls: ["../../css/browse.css"],
})
export class MyComponent implements OnInit {
  public categoryOptions = [
    {value: "faves", name: "faves"},
    {value: "views", name: "views"},
    {value: "comments", name: "comments"},
    {value: "interesting", name: "interesting"},
  ];
  public category: string;
  public my = true;
  public waiting = false;
  public offset = 0;
  private subscriptionFav: Subscription = null;
  private subscriptionCom: Subscription = null;

  constructor(private serviceSearch: ServiceSearch,
              private serviceStorage: ServiceStorage,
              public servicePhotos: ServicePhotos,
              private serviceAddFavorites: ServiceAddFavorites,
              private serviceAddComments: ServiceAddComments,
    ) {}

  public ngOnInit() {
    this.servicePhotos.initPhotos();
    this.servicePhotos.resetPage();
    this.retrieveFromStorage();
    this.servicePhotos.clearPhoto();
    this.fetch(true);
  }

  private retrieveFromStorage() {
    this.servicePhotos.perPage = parseInt(this.serviceStorage.get("my.per_page"), 10) || 15;
    this.category = this.serviceStorage.get("my.category") || "interesting";
  }

  private persistToStorage() {
    this.serviceStorage.set("my.per_page", this.servicePhotos.strPerPage());
    this.serviceStorage.set("my.category", this.category);
  }

  private initSearchParams(): URLSearchParams {
    const searchParams = new URLSearchParams();
    searchParams.append("per_page", this.servicePhotos.strPerPage());
    searchParams.append("page", this.servicePhotos.strPage());
    searchParams.append("sort", this.category);
    searchParams.append("extras", flickrUrls.extra.full);
    return searchParams;
  }

  public closeDetails() {
    this.servicePhotos.clearPhoto();
  }

  @HostListener("window:keydown", ["$event"])
  public onKey(e) {
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
    this.subscriptionCom = this.serviceAddComments.stream$.subscribe(() => {});
    this.serviceAddComments.addComments(this.servicePhotos.photos);
  }

  private getPopular() {
    this.serviceSearch.getMyPopular(this.initSearchParams())
      .subscribe((data) => {
        // bug in api: total always is same as per_page, pages always is one
        this.servicePhotos.pages = 999; // is there a next page? always! (work-around)
        this.servicePhotos.photos = this.servicePhotos.photos.concat(data.items);
        this.servicePhotos.total = data.total;
        this.waiting = false;
        this.servicePhotos.justify();
        this.addFavorites();
        this.addComments();
        this.persistToStorage();
      });
  }

  public fetch(init: boolean) {
    this.waiting = true;
    if (init) {
      this.servicePhotos.initPhotos();
    }
    this.servicePhotos.clearPhoto();
    this.getPopular();
  }

  public nextScrolledPage() {
    if (this.servicePhotos.nextPage()) {
      this.getPopular();
    }
  }

}
