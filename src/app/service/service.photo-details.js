System.register(["./service.search", "../helpers/exif", "@angular/core", "../model/model.person", "../helpers/util", "../helpers/urls"], function (exports_1, context_1) {
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
    var service_search_1, exif_1, core_1, model_person_1, util_1, urls_1, ServicePhotoDetails, ServicePhotoDetails_1;
    return {
        setters: [
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (exif_1_1) {
                exif_1 = exif_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (model_person_1_1) {
                model_person_1 = model_person_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            ServicePhotoDetails = ServicePhotoDetails_1 = (function () {
                function ServicePhotoDetails(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                }
                ServicePhotoDetails.packedComment = function (comment) {
                    return {
                        buddyicon: urls_1.buddyCommentIconSrc(comment),
                        ownerpage: urls_1.getCommentOwnerPage(comment),
                        username: comment.authorname,
                        realname: comment.realname,
                        nsid: comment.author,
                        content: comment._content,
                    };
                };
                ServicePhotoDetails.prototype.addComments = function (photo) {
                    this.serviceSearch.getComments(photo.id).subscribe(function (comments) {
                        if (!comments) {
                            return [];
                        }
                        photo.comments = comments.map(function (item) {
                            return ServicePhotoDetails_1.packedComment(item);
                        });
                    });
                };
                ServicePhotoDetails.prototype.addFavorites = function (photo) {
                    if (!photo.favorites) {
                        this.serviceSearch.getFavorites(photo.id, 50).subscribe(function (response) {
                            photo.favorites = response.favorites.map(function (item) {
                                return model_person_1.PersonModel.buddyPackedPerson(item);
                            });
                            photo.favoritesLen = response.count;
                        });
                    }
                    else {
                        photo.favorites = photo.favorites.map(function (item) {
                            return model_person_1.PersonModel.buddyPackedPerson(item);
                        });
                    }
                };
                ServicePhotoDetails.prototype.addExif = function (photo) {
                    this.serviceSearch.getExif(photo.id).subscribe(function (pphoto) {
                        photo.exif = pphoto;
                        if (photo.exif) {
                            photo.xExif = exif_1.getExif(pphoto.exif, pphoto.camera);
                        }
                    });
                };
                ServicePhotoDetails.prototype.addGroups = function (photo) {
                    photo.group_ids = [];
                    this.serviceSearch.getAllContexts(photo.id).subscribe(function (result) {
                        if (result.stat === "ok") {
                            if (result.pool) {
                                for (var _i = 0, _a = result.pool; _i < _a.length; _i++) {
                                    var pool = _a[_i];
                                    photo.group_ids.push(pool.id);
                                }
                            }
                            if (result.set) {
                                photo.set = result.set;
                            }
                        }
                        else {
                            console.log(result);
                        }
                    });
                };
                ServicePhotoDetails.addExtra = function (photo) {
                    photo.xDescription = photo.description._content ?
                        photo.description._content : "";
                    photo.xOriginalsrc = urls_1.getOriginal(photo);
                    photo.xOwnerPage =
                        urls_1.photoOwnerPage(photo.id, photo.owner);
                    photo.xBuddyIconSrc = urls_1.getBuddyIconSrc(photo);
                    photo.xSrc = photo.url_l ? photo.url_l : photo.url_m;
                    photo.xAltSrc = photo.xSrc.replace("_h", "");
                    photo.xDna = urls_1.dnaUrl(photo.owner);
                };
                ServicePhotoDetails.prototype.addDates = function (photo) {
                    this.serviceSearch.getPhotosInfo(photo.id).subscribe(function (result) {
                        photo.taken = result.dates.taken;
                        photo.posted = util_1.dateFromUnixTimestamp(result.dates.posted);
                    });
                };
                ServicePhotoDetails.prototype.addLocation = function (photo) {
                    this.serviceSearch.geoGetLocation(photo.id).subscribe(function (response) {
                        photo.location = response;
                    });
                };
                ServicePhotoDetails.prototype.addToDetails = function (photo) {
                    ServicePhotoDetails_1.addExtra(photo);
                    this.addFavorites(photo);
                    this.addComments(photo);
                    this.addExif(photo);
                    this.addGroups(photo);
                    this.addDates(photo);
                    this.addLocation(photo);
                };
                return ServicePhotoDetails;
            }());
            ServicePhotoDetails = ServicePhotoDetails_1 = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], ServicePhotoDetails);
            exports_1("ServicePhotoDetails", ServicePhotoDetails);
        }
    };
});
//# sourceMappingURL=service.photo-details.js.map