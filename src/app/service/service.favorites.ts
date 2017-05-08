import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ServiceSearch} from "./service.search";
// import apiConfig = require("../api.config");
import {
    calcPagesFromTotal, sort_direction, sort_type,
    sortField,
} from "../helpers/util";
import {PersonModel} from "../model/model.person";
import {fave_item} from "../helpers/photo_util";
import {buddyFavIconSrc, favOwnerPage, flickrUrls} from "../helpers/urls";
import {ownNsid} from "../api.config";

/**
 * Created by orion on 13/03/2017.
 */

@Injectable()
export class ServiceFavorites {
    public owners: PersonModel[];
    public favoritesCount: number;
    public waiting: boolean = false;
    public pagesTodo: number;

    constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    // Observable source
    private source = new BehaviorSubject<any>(0);

    // Observable stream
    public faverites$ = this.source.asObservable();

    private onComplete() {
        sortField(this.owners, "name", sort_direction.Asc, sort_type.Alphanum);
        this.waiting = false;
        this.source.next({
            persons: this.owners,
            favoritesCount: this.favoritesCount,
        });
    }

    private augmentOwners() {
        let ownersTodo = this.owners.length;
        for (const owner of this.owners) {
            this.serviceSearch.peopleGetInfo(owner.nsid).subscribe((item) => {
                let name;
                if (item.realname) {
                    name = item.realname._content;
                }
                if (!name || name === "") {
                    name = item.username._content;
                }
                const buddyicon = item.iconfarm === 0 ? flickrUrls.staticName.defaultBuddyIcon :
                    buddyFavIconSrc(item);
                const ownerpage = favOwnerPage(item);
                owner.name = name;
                owner.buddyicon = buddyicon;
                owner.ownerpage = ownerpage;

                if (--ownersTodo === 0) {
                    this.onComplete();
                }
            });
        }
    }

    private addOwners(photos) {
        for (const item of photos) {
            let found = false;
            for (const person of this.owners) {
                if (person.nsid === item.owner) {
                    found = true;
                    person.items.push(fave_item(item.date_faved, item.id));
                    break;
                }
            }
            if (!found) {
                const owner = new PersonModel();
                owner.items = [fave_item(item.date_faved, item.id)];
                owner.nsid = item.owner;
                this.owners.push(owner);
            }
        }
    }

    // service command
    public getFavorites() {
        this.owners = [];
        this.favoritesCount = 0;
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)
        this.serviceSearch.getUserFavorites(ownNsid, 1, 1).subscribe((photos) => {
            if (photos && photos.total) {
                this.waiting = true;
                const pages = calcPagesFromTotal(photos.total, perPage);
                this.pagesTodo = pages;
                for (let i = 0; i < pages; i++) {
                    this.serviceSearch.getUserFavorites(ownNsid, i + 1, perPage).subscribe((favPhotos) => {
                        if (favPhotos && favPhotos.photo.length > 0) {
                            this.addOwners(favPhotos.photo);
                            this.favoritesCount += favPhotos.photo.length;
                        } else {
                            console.log("empty result");
                        }
                        if (--this.pagesTodo === 0) {
                            this.augmentOwners();
                        }
                    });
                }

            }
        });
    }
}
