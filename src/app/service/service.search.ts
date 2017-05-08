/**
 * Created by orion on 26/02/2017.
 */
import { Injectable } from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
// import apiConfig = require("../api.config");
import {
    flickrUrls, getBuddyIconSrc, getGroupIconSrc, groupSrc, photoOwnerPage,
    tagPage,
} from "../helpers/urls";
import {ownNsid} from "../api.config";

@Injectable()
export class ServiceSearch {
  private static searchParams(params): URLSearchParams {
    const params2 = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        params2.append(key, params[key]);
      }
    }
    return params2;
  }

  private static ownId(): URLSearchParams {
    return new URLSearchParams("user_id=" + ownNsid);
  }

  constructor(
        private http: Http,
    ) {}

    public geoGetLocation(photoId: string) {
        return this.http.get(flickrUrls.api.geoLocation, {
            search: new URLSearchParams("photo_id=" + photoId),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photo.location;
                }
                console.log(json);
            });
    }

    public getMyPublicList() {
        return this.http.get(flickrUrls.api.contactsPublicList, {
            search: ServiceSearch.ownId(),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.contacts.contact;
                }
                console.log(json);
            });
    }

    public getProfile(nsid) {
        return this.http.get(flickrUrls.api.profile, {
            search: new URLSearchParams("user_id=" + nsid),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.profile;
                }
                console.log(json);
            });
    }

    public getPrimaryAlbumPhoto(photosetId) {
        return this.http.get(flickrUrls.api.albumPhotos, {
            search: ServiceSearch.searchParams({
                user_id: ownNsid,
                photoset_id: photosetId,
            }),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    let primary = json.photoset.photo.filter((item) =>
                        item.isprimary === "1");
                    if (!primary.length) {
                        primary = json.photoset.photo[0];
                    } else {
                        primary = primary[0];
                    }
                    return {
                        primary,
                        count: json.photoset.total,
                    };
                }
            });
    }

    public getAlbumPhotos(photosetId) {
        return this.http.get(flickrUrls.api.albumPhotos, {
            search: ServiceSearch.searchParams({
                user_id: ownNsid,
                photoset_id: photosetId,
                extras: flickrUrls.extra.full,
            }),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photoset;
                }
                console.log(json);
            });
    }

    public getMyAlbums() {
        return this.http.get(flickrUrls.api.albums, {
            search: ServiceSearch.ownId(),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photosets.photoset;
                }
                console.log(json);
            });
    }

    public groupsPoolsGetPhotos(groupId) {
        return this.http.get(flickrUrls.api.poolPhotos, {
            search: ServiceSearch.searchParams({
                user_id: ownNsid,
                group_id: groupId,
                extras: flickrUrls.extra.full,
            }),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photos.photo;
                }
                console.log(groupId, json);
                return null;
            });
    }

    public getGroupSrc(groups) {
        return groups.map((item) => {
            item.x_buddyicon = getGroupIconSrc(item);
            item.x_groupsrc = groupSrc(item);
            return item;
        });
    }

    public getPublicGroups() {
        return this.http.get(flickrUrls.api.publicGroups, {
            search: ServiceSearch.ownId(),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return this.getGroupSrc(json.groups.group);
                }
                console.log(json);
            });
    }

    private addBuddyToPhotos(photos) {
        return photos.map((item) => {
            item.x_buddyicon = getBuddyIconSrc(item);
            item.x_ownerpage = photoOwnerPage(item.id, item.owner);
            return item;
        });
    }

    public getSizes(photoId: string) {
        return this.http.get(flickrUrls.api.sizes, {
            search: new URLSearchParams("photo_id=" + photoId),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.sizes.size;
                }
                console.log(json);
            });
    }

    // public getFlickrPhotos(url: string, searchParams: URLSearchParams) {
    //     return this.http.get(url, {search: searchParams})
    //         .map((response) => {
    //             return this.getData(response);
    //         },
    //     );
    // }

    public getPhotosInfo(photoId: string) {
        return this.http.get(flickrUrls.api.photoInfo, {
            search: new URLSearchParams("photo_id=" + photoId),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photo;
                }
                console.log(json);
            });
    }

    private getData(response) {
        const photos = response.json().photos;
        if (!photos) {
            console.log(response.json());
            return null;
        }
        return {
            items: this.addBuddyToPhotos(photos.photo),
            total: photos.total,
            pages: photos.pages,
        };
    }

    public search(searchParams: URLSearchParams) {
        return this.http.get(flickrUrls.api.search, {search: searchParams})
            .map((response) => {
                return this.getData(response);
            },
        );
    }

    public getRecent(searchParams: URLSearchParams) {
        return this.http.get(flickrUrls.api.recent, {search: searchParams})
            .map((response) => {
                return this.getData(response);
            },
        );
    }

    /*
     * getPopular lijkt bug te hebben: retourneert altijd pages 1 terwijl count afhankelijk is van per_page
     */
    public getMyPopular(searchParams: URLSearchParams) {
        searchParams.append("user_id", ownNsid);
        return this.http.get(flickrUrls.api.popular, {search: searchParams})
            .map((response) => {
                return this.getData(response);
            },
        );
    }

    /*
     * Use search one photo, to get my counts
     */
    public myPhotosTotal() {
        return this.http.get(flickrUrls.api.search, {
            search: ServiceSearch.searchParams({
                user_id: ownNsid,
                per_page: "1",
                page: "1",
                content_type: "1", // important!
            }),
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photos.total;
                }
                console.log(json);
                return null;
            });
    }

    public myPhotosPage(page, perPage, enrich: boolean) {
        const searchParams = new URLSearchParams();
        searchParams.append("user_id", ownNsid);
        searchParams.append("per_page", perPage); // just get information about totals
        searchParams.append("page", page);
        searchParams.append("content_type", "1"); // important!
        if (enrich) {
            searchParams.append("extras", flickrUrls.extra.full);
        }
        return this.http.get(flickrUrls.api.search, {
            search: searchParams,
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photos;
                }
                console.log(json);
                return null;
            });
    }

    public getFavorites(photoId, perPage) {
        const searchParams = new URLSearchParams();
        searchParams.append("photo_id", photoId);
        searchParams.append("per_page", perPage);
        return this.http.get(flickrUrls.api.favorites, {
            search: searchParams,
        })
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return {
                        count: json.photo.total,
                        favorites: json.photo.person,
                    };
                } else {
                    console.log(json);
                    return null;
                }
            });
    }

    public getUserFavorites(userId, page, perPage) {
        const searchParams = new URLSearchParams();
        searchParams.append("user_id", userId);
        searchParams.append("page", page);
        searchParams.append("per_page", perPage);
        return this.http.get(flickrUrls.api.favoritesList, {search: searchParams})
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photos;
                }
                console.log(json);
            });
    }

    public getUserFavoritesCount(userId) {
        const searchParams = new URLSearchParams();
        searchParams.append("user_id", userId);
        searchParams.append("per_page", "1");
        return this.http.get(flickrUrls.api.favoritesList, {search: searchParams})
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photos.total;
                }
                console.log(json);
            });
    }

    public getComments(photoId) {
        const searchParams = new URLSearchParams();
        searchParams.append("photo_id", photoId);
        return this.http.get(flickrUrls.api.comments, {search: searchParams})
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.comments.comment;
                }
                console.log(json);
                return "";
            });
    }

    public getAllContexts(photoId) {
        const searchParams = new URLSearchParams();
        searchParams.append("photo_id", photoId);
        return this.http.get(flickrUrls.api.allcontexts, {search: searchParams})
            .map((response) => {
                return response.json();
            });
    }

    public getExif(photoId) {
        const searchParams = new URLSearchParams();
        searchParams.append("photo_id", photoId);
        return this.http.get(flickrUrls.api.exif, {search: searchParams})
            .map((response) => {
                const json = response.json();
                if (json.stat === "ok") {
                    return json.photo;
                }
                console.log(json);
            });
    }

    public explore(searchParams: URLSearchParams) {
        searchParams.append("extras", flickrUrls.extra.full);
        searchParams.append("content_type", "1");
        return this.http.get(flickrUrls.api.explore, {search: searchParams})
            .map((response) => this.getData(response));
    }

    public getTags(searchParams: URLSearchParams) {
        // const url = this.serviceUrl.tagsGetHotListUrl();
        return this.http.get(flickrUrls.api.tags, {search: searchParams}).map((response) => {
            const json = response.json();
            if (json.stat === "ok") {
                return json.hottags.tag.map((item) => {
                    item.page = tagPage(item._content);
                    return item;
                });
            }
            console.log(json);
        });
    }

    public peopleGetInfo(nsid: string) {
        // console.log(nsid);
        // const url = this.serviceUrl.peopleGetInfoUrl();
        const searchParams = new URLSearchParams();
        searchParams.append("user_id", nsid);
        return this.http.get(flickrUrls.api.peopleInfo, { search: searchParams} ).map((response) => {
            const json = response.json();
            if (json.stat === "ok") {
                return json.person;
            }
            console.log(json);
        });
    }

    public groupGetInfo(nsid: string) {
        // const url = this.serviceUrl.groupGetInfoUrl();
        const searchParams = new URLSearchParams();
        searchParams.append("group_id", nsid);
        return this.http.get(flickrUrls.api.groupInfo, { search: searchParams} ).map((response) => {
            const json = response.json();
            if (json.stat === "ok") {
                return json.group;
            }
            console.log(json);
        });
    }

}
