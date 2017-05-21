/**
 * Created by orion on 16/03/2017.
 */

import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ServiceSearch} from "./service.search";
import {cloneProperties, dateFromUnixTimestamp} from "../helpers/util";
import {medium_of_sizes} from "../helpers/photo_util";
import {
    getBuddyIconSrc, photoLSrc, photoOwnerPage,
    photoSrc,
} from "../helpers/urls";

@Injectable()
export class ServiceFavoritesList {
  // Observable source
  private source = new BehaviorSubject<any>(0);

  // Observable stream
  public faveritesList$ = this.source.asObservable();

  private static packedPhoto(photo, sizes, favedate) {
    const dim = medium_of_sizes(sizes);
    const pack = {
      x_buddyicon: getBuddyIconSrc(photo),
      x_ownerpage: photoOwnerPage(photo.id, photo.owner.nsid),
      owner: photo.owner.nsid,
      iconserver: photo.owner.iconserver,
      farm: photo.owner.iconfarm,
      url_m: photoSrc(photo),
      url_l: photoLSrc(photo),
      width_m: dim.width,
      height_m: dim.height,
      title: photo.title._content,
      taken: photo.dates.taken,
      posted: photo.dates.posted,
      favedate,
      strfavedate: dateFromUnixTimestamp(favedate),
      id: photo.id,
    };
    const props = [
      "views", "description", "secret", "originalsecret", "originalformat", "server",
    ];
    cloneProperties(props, photo, pack);
    return pack;
  }

  constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    public getPersonPhotos(items) {
        const photos = [];
        let lenItems = items.length;
        for (const item of items) {
            this.serviceSearch.getPhotosInfo(item.id).subscribe((info) => {
                this.serviceSearch.getSizes(item.id).subscribe((sizes) => {
                    const packed = ServiceFavoritesList.packedPhoto(info, sizes, item.favedate);
                    photos.push(packed);
                    if (--lenItems === 0) {
                        this.source.next(photos);
                    }
                });
            });
        }
    }

}
