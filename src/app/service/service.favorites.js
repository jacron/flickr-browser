System.register(["@angular/core", "rxjs/BehaviorSubject", "./service.search", "../api.config", "../helpers/util", "../model/model.person", "../helpers/photo_util", "../helpers/urls"], function (exports_1, context_1) {
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
    var core_1, BehaviorSubject_1, service_search_1, apiConfig, util_1, model_person_1, photo_util_1, urls_1, ServiceFavorites;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (apiConfig_1) {
                apiConfig = apiConfig_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (model_person_1_1) {
                model_person_1 = model_person_1_1;
            },
            function (photo_util_1_1) {
                photo_util_1 = photo_util_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            ServiceFavorites = (function () {
                function ServiceFavorites(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                    this.waiting = false;
                    // Observable source
                    this.source = new BehaviorSubject_1.BehaviorSubject(0);
                    // Observable stream
                    this.faverites$ = this.source.asObservable();
                }
                ServiceFavorites.prototype.onComplete = function () {
                    util_1.sortField(this.owners, "name", util_1.sort_direction.Asc, util_1.sort_type.Alphanum);
                    this.waiting = false;
                    this.source.next({
                        persons: this.owners,
                        favoritesCount: this.favoritesCount,
                    });
                };
                ServiceFavorites.prototype.augmentOwners = function () {
                    var _this = this;
                    var ownersTodo = this.owners.length;
                    var _loop_1 = function (owner) {
                        this_1.serviceSearch.peopleGetInfo(owner.nsid).subscribe(function (item) {
                            var name;
                            if (item.realname) {
                                name = item.realname._content;
                            }
                            if (!name || name === "") {
                                name = item.username._content;
                            }
                            var buddyicon = item.iconfarm === 0 ? urls_1.flickrUrls.staticName.defaultBuddyIcon :
                                urls_1.buddyFavIconSrc(item);
                            var ownerpage = urls_1.favOwnerPage(item);
                            owner.name = name;
                            owner.buddyicon = buddyicon;
                            owner.ownerpage = ownerpage;
                            if (--ownersTodo === 0) {
                                _this.onComplete();
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, _a = this.owners; _i < _a.length; _i++) {
                        var owner = _a[_i];
                        _loop_1(owner);
                    }
                };
                ServiceFavorites.prototype.addOwners = function (photos) {
                    for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                        var item = photos_1[_i];
                        var found = false;
                        for (var _a = 0, _b = this.owners; _a < _b.length; _a++) {
                            var person = _b[_a];
                            if (person.nsid === item.owner) {
                                found = true;
                                person.items.push(photo_util_1.fave_item(item.date_faved, item.id));
                                break;
                            }
                        }
                        if (!found) {
                            var owner = new model_person_1.PersonModel();
                            owner.items = [photo_util_1.fave_item(item.date_faved, item.id)];
                            owner.nsid = item.owner;
                            this.owners.push(owner);
                        }
                    }
                };
                // service command
                ServiceFavorites.prototype.getFavorites = function () {
                    var _this = this;
                    this.owners = [];
                    this.favoritesCount = 0;
                    var perPage = 50; // max allowed: 500 (use smaller number than total, to practice the algoritm)
                    this.serviceSearch.getUserFavorites(apiConfig.ownNsid, 1, 1).subscribe(function (photos) {
                        if (photos && photos.total) {
                            _this.waiting = true;
                            var pages = util_1.calcPagesFromTotal(photos.total, perPage);
                            _this.pagesTodo = pages;
                            for (var i = 0; i < pages; i++) {
                                _this.serviceSearch.getUserFavorites(apiConfig.ownNsid, i + 1, perPage).subscribe(function (favPhotos) {
                                    if (favPhotos && favPhotos.photo.length > 0) {
                                        _this.addOwners(favPhotos.photo);
                                        _this.favoritesCount += favPhotos.photo.length;
                                    }
                                    else {
                                        console.log("empty result");
                                    }
                                    if (--_this.pagesTodo === 0) {
                                        _this.augmentOwners();
                                    }
                                });
                            }
                        }
                    });
                };
                return ServiceFavorites;
            }());
            ServiceFavorites = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], ServiceFavorites);
            exports_1("ServiceFavorites", ServiceFavorites);
        }
    };
});
//# sourceMappingURL=service.favorites.js.map