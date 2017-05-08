System.register(["@angular/core", "@angular/http", "rxjs/add/operator/map", "../api.config", "../helpers/urls"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, apiConfig, urls_1, ServiceSearch, ServiceSearch_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            },
            function (apiConfig_1) {
                apiConfig = apiConfig_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            ServiceSearch = ServiceSearch_1 = (function () {
                function ServiceSearch(http) {
                    this.http = http;
                }
                ServiceSearch.searchParams = function (params) {
                    var params2 = new http_1.URLSearchParams();
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            params2.append(key, params[key]);
                        }
                    }
                    return params2;
                };
                ServiceSearch.ownId = function () {
                    return new http_1.URLSearchParams("user_id=" + apiConfig.ownNsid);
                };
                ServiceSearch.prototype.geoGetLocation = function (photoId) {
                    return this.http.get(urls_1.flickrUrls.api.geoLocation, {
                        search: new http_1.URLSearchParams("photo_id=" + photoId),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photo.location;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getMyPublicList = function () {
                    return this.http.get(urls_1.flickrUrls.api.contactsPublicList, {
                        search: ServiceSearch_1.ownId(),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.contacts.contact;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getProfile = function (nsid) {
                    return this.http.get(urls_1.flickrUrls.api.profile, {
                        search: new http_1.URLSearchParams("user_id=" + nsid),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.profile;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getPrimaryAlbumPhoto = function (photosetId) {
                    return this.http.get(urls_1.flickrUrls.api.albumPhotos, {
                        search: ServiceSearch_1.searchParams({
                            user_id: apiConfig.ownNsid,
                            photoset_id: photosetId,
                        }),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            var primary = json.photoset.photo.filter(function (item) {
                                return item.isprimary === "1";
                            });
                            if (!primary.length) {
                                primary = json.photoset.photo[0];
                            }
                            else {
                                primary = primary[0];
                            }
                            return {
                                primary: primary,
                                count: json.photoset.total,
                            };
                        }
                    });
                };
                ServiceSearch.prototype.getAlbumPhotos = function (photosetId) {
                    return this.http.get(urls_1.flickrUrls.api.albumPhotos, {
                        search: ServiceSearch_1.searchParams({
                            user_id: apiConfig.ownNsid,
                            photoset_id: photosetId,
                            extras: urls_1.flickrUrls.extra.full,
                        }),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photoset;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getMyAlbums = function () {
                    return this.http.get(urls_1.flickrUrls.api.albums, {
                        search: ServiceSearch_1.ownId(),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photosets.photoset;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.groupsPoolsGetPhotos = function (groupId) {
                    return this.http.get(urls_1.flickrUrls.api.poolPhotos, {
                        search: ServiceSearch_1.searchParams({
                            user_id: apiConfig.ownNsid,
                            group_id: groupId,
                            extras: urls_1.flickrUrls.extra.full,
                        }),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photos.photo;
                        }
                        console.log(groupId, json);
                        return null;
                    });
                };
                ServiceSearch.prototype.getGroupSrc = function (groups) {
                    return groups.map(function (item) {
                        item.x_buddyicon = urls_1.getGroupIconSrc(item);
                        item.x_groupsrc = urls_1.groupSrc(item);
                        return item;
                    });
                };
                ServiceSearch.prototype.getPublicGroups = function () {
                    var _this = this;
                    return this.http.get(urls_1.flickrUrls.api.publicGroups, {
                        search: ServiceSearch_1.ownId(),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return _this.getGroupSrc(json.groups.group);
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.addBuddyToPhotos = function (photos) {
                    return photos.map(function (item) {
                        item.x_buddyicon = urls_1.getBuddyIconSrc(item);
                        item.x_ownerpage = urls_1.photoOwnerPage(item.id, item.owner);
                        return item;
                    });
                };
                ServiceSearch.prototype.getSizes = function (photoId) {
                    return this.http.get(urls_1.flickrUrls.api.sizes, {
                        search: new http_1.URLSearchParams("photo_id=" + photoId),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.sizes.size;
                        }
                        console.log(json);
                    });
                };
                // public getFlickrPhotos(url: string, searchParams: URLSearchParams) {
                //     return this.http.get(url, {search: searchParams})
                //         .map((response) => {
                //             return this.getData(response);
                //         },
                //     );
                // }
                ServiceSearch.prototype.getPhotosInfo = function (photoId) {
                    return this.http.get(urls_1.flickrUrls.api.photoInfo, {
                        search: new http_1.URLSearchParams("photo_id=" + photoId),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photo;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getData = function (response) {
                    var photos = response.json().photos;
                    if (!photos) {
                        console.log(response.json());
                        return null;
                    }
                    return {
                        items: this.addBuddyToPhotos(photos.photo),
                        total: photos.total,
                        pages: photos.pages,
                    };
                };
                ServiceSearch.prototype.search = function (searchParams) {
                    var _this = this;
                    return this.http.get(urls_1.flickrUrls.api.search, { search: searchParams })
                        .map(function (response) {
                        return _this.getData(response);
                    });
                };
                ServiceSearch.prototype.getRecent = function (searchParams) {
                    var _this = this;
                    return this.http.get(urls_1.flickrUrls.api.recent, { search: searchParams })
                        .map(function (response) {
                        return _this.getData(response);
                    });
                };
                /*
                 * getPopular lijkt bug te hebben: retourneert altijd pages 1 terwijl count afhankelijk is van per_page
                 */
                ServiceSearch.prototype.getMyPopular = function (searchParams) {
                    var _this = this;
                    searchParams.append("user_id", apiConfig.ownNsid);
                    return this.http.get(urls_1.flickrUrls.api.popular, { search: searchParams })
                        .map(function (response) {
                        return _this.getData(response);
                    });
                };
                /*
                 * Use search one photo, to get my counts
                 */
                ServiceSearch.prototype.myPhotosTotal = function () {
                    return this.http.get(urls_1.flickrUrls.api.search, {
                        search: ServiceSearch_1.searchParams({
                            user_id: apiConfig.ownNsid,
                            per_page: "1",
                            page: "1",
                            content_type: "1",
                        }),
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photos.total;
                        }
                        console.log(json);
                        return null;
                    });
                };
                ServiceSearch.prototype.myPhotosPage = function (page, perPage, enrich) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("user_id", apiConfig.ownNsid);
                    searchParams.append("per_page", perPage); // just get information about totals
                    searchParams.append("page", page);
                    searchParams.append("content_type", "1"); // important!
                    if (enrich) {
                        searchParams.append("extras", urls_1.flickrUrls.extra.full);
                    }
                    return this.http.get(urls_1.flickrUrls.api.search, {
                        search: searchParams,
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photos;
                        }
                        console.log(json);
                        return null;
                    });
                };
                ServiceSearch.prototype.getFavorites = function (photoId, perPage) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("photo_id", photoId);
                    searchParams.append("per_page", perPage);
                    return this.http.get(urls_1.flickrUrls.api.favorites, {
                        search: searchParams,
                    })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return {
                                count: json.photo.total,
                                favorites: json.photo.person,
                            };
                        }
                        else {
                            console.log(json);
                            return null;
                        }
                    });
                };
                ServiceSearch.prototype.getUserFavorites = function (userId, page, perPage) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("user_id", userId);
                    searchParams.append("page", page);
                    searchParams.append("per_page", perPage);
                    return this.http.get(urls_1.flickrUrls.api.favoritesList, { search: searchParams })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photos;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getUserFavoritesCount = function (userId) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("user_id", userId);
                    searchParams.append("per_page", "1");
                    return this.http.get(urls_1.flickrUrls.api.favoritesList, { search: searchParams })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photos.total;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.getComments = function (photoId) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("photo_id", photoId);
                    return this.http.get(urls_1.flickrUrls.api.comments, { search: searchParams })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.comments.comment;
                        }
                        console.log(json);
                        return "";
                    });
                };
                ServiceSearch.prototype.getAllContexts = function (photoId) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("photo_id", photoId);
                    return this.http.get(urls_1.flickrUrls.api.allcontexts, { search: searchParams })
                        .map(function (response) {
                        return response.json();
                    });
                };
                ServiceSearch.prototype.getExif = function (photoId) {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("photo_id", photoId);
                    return this.http.get(urls_1.flickrUrls.api.exif, { search: searchParams })
                        .map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.photo;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.explore = function (searchParams) {
                    var _this = this;
                    searchParams.append("extras", urls_1.flickrUrls.extra.full);
                    searchParams.append("content_type", "1");
                    return this.http.get(urls_1.flickrUrls.api.explore, { search: searchParams })
                        .map(function (response) { return _this.getData(response); });
                };
                ServiceSearch.prototype.getTags = function (searchParams) {
                    // const url = this.serviceUrl.tagsGetHotListUrl();
                    return this.http.get(urls_1.flickrUrls.api.tags, { search: searchParams }).map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.hottags.tag.map(function (item) {
                                item.page = urls_1.tagPage(item._content);
                                return item;
                            });
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.peopleGetInfo = function (nsid) {
                    // console.log(nsid);
                    // const url = this.serviceUrl.peopleGetInfoUrl();
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("user_id", nsid);
                    return this.http.get(urls_1.flickrUrls.api.peopleInfo, { search: searchParams }).map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.person;
                        }
                        console.log(json);
                    });
                };
                ServiceSearch.prototype.groupGetInfo = function (nsid) {
                    // const url = this.serviceUrl.groupGetInfoUrl();
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("group_id", nsid);
                    return this.http.get(urls_1.flickrUrls.api.groupInfo, { search: searchParams }).map(function (response) {
                        var json = response.json();
                        if (json.stat === "ok") {
                            return json.group;
                        }
                        console.log(json);
                    });
                };
                return ServiceSearch;
            }());
            ServiceSearch = ServiceSearch_1 = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], ServiceSearch);
            exports_1("ServiceSearch", ServiceSearch);
        }
    };
});
//# sourceMappingURL=service.search.js.map