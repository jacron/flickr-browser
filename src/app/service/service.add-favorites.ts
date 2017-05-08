/**
 * Created by orion on 04/04/2017.
 */
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ServiceSearch} from "./service.search";
@Injectable()
export class ServiceAddFavorites {

    constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    // Observable source
    private source = new BehaviorSubject<any>(0);

    // Observable stream
    public stream$ = this.source.asObservable();

    public addFavorites(photos) {
        let photosLen = photos.length;
        for (const item of photos) {
            this.serviceSearch.getFavorites(item.id, 50).subscribe((response) => {
                if (response) {
                    item.favorites = response.favorites;
                    item.favoritesLen = response.count;
                }
                if (--photosLen === 0) {
                    this.source.next(true);
                }
            });
        }
    }

}
