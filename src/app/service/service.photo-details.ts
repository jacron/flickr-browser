import {ServiceSearch} from "./service.search";
import {getExif} from "../helpers/exif";
import {Injectable} from "@angular/core";
import {PhotoModel} from "../model/model.photo";
import {PhotoComment} from "../model/model.photo-comment";
import {PersonModel} from "../model/model.person";
import {dateFromUnixTimestamp} from "../helpers/util";
import {
    buddyCommentIconSrc, dnaUrl, getBuddyIconSrc, getCommentOwnerPage,
    getOriginal, photoOwnerPage,
} from "../helpers/urls";

/**
 * Created by orion on 16/03/2017.
 * give a photo its details
 */

@Injectable()
export class ServicePhotoDetails {

    constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    private static packedComment(comment): PhotoComment {
        return {
            buddyicon: buddyCommentIconSrc(comment),
            ownerpage: getCommentOwnerPage(comment),
            username: comment.authorname,
            realname: comment.realname,
            nsid: comment.author,
            content: comment._content,
        };
    }

    private addComments(photo: PhotoModel) {
        this.serviceSearch.getComments(photo.id).subscribe((comments) => {
            if (!comments) {
                return [];
            }
            photo.comments = comments.map((item) => {
                return ServicePhotoDetails.packedComment(item);
            });
        });
    }

    private addFavorites(photo: PhotoModel) {
        if (!photo.favorites) {
            this.serviceSearch.getFavorites(photo.id, 50).subscribe((response) => {
                photo.favorites = response.favorites.map((item) => {
                    return PersonModel.buddyPackedPerson(item);
                });
                photo.favoritesLen = response.count;
            });
        } else {
            photo.favorites = photo.favorites.map((item) => {
                return PersonModel.buddyPackedPerson(item);
            });
        }
    }

    private addExif(photo: PhotoModel) {
        this.serviceSearch.getExif(photo.id).subscribe((pphoto) => {
            photo.exif = pphoto;
            if (photo.exif) {
                photo.xExif = getExif(pphoto.exif, pphoto.camera);
            }
        });
    }

    private addGroups(photo: PhotoModel) {
        photo.group_ids = [];
        this.serviceSearch.getAllContexts(photo.id).subscribe((result) => {
            if (result.stat === "ok") {
                if (result.pool) {
                    for (const pool of result.pool) {
                        photo.group_ids.push(pool.id);
                    }
                }
                if (result.set) {
                    photo.set = result.set;
                }
            } else {
                console.log(result);
            }
        });
    }

    private static addExtra(photo: PhotoModel) {
        photo.xDescription = photo.description._content ?
            photo.description._content : "";
        photo.xOriginalsrc = getOriginal(photo);
        photo.xOwnerPage =
            photoOwnerPage(photo.id, photo.owner);
        photo.xBuddyIconSrc = getBuddyIconSrc(photo);
        photo.xSrc = photo.url_l ? photo.url_l : photo.url_m;
        photo.xAltSrc = photo.xSrc.replace("_h", "");
        photo.xDna = dnaUrl(photo.owner);
    }

    private addDates(photo: PhotoModel) {
        this.serviceSearch.getPhotosInfo(photo.id).subscribe((result) => {
            photo.taken = result.dates.taken;
            photo.posted = dateFromUnixTimestamp(result.dates.posted);
        });
    }

    private addLocation(photo) {
        this.serviceSearch.geoGetLocation(photo.id).subscribe((response) => {
            photo.location = response;
        });
    }

    public addToDetails(photo: PhotoModel) {
        ServicePhotoDetails.addExtra(photo);
        this.addFavorites(photo);
        this.addComments(photo);
        this.addExif(photo);
        this.addGroups(photo);
        this.addDates(photo);
        this.addLocation(photo);
    }

}
