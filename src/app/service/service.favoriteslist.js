/**
 * Created by orion on 16/03/2017.
 */
System.register(["@angular/core", "rxjs/BehaviorSubject", "./service.search", "../helpers/util", "../helpers/photo_util", "../helpers/urls"], function (exports_1, context_1) {
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
    var core_1, BehaviorSubject_1, service_search_1, util_1, photo_util_1, urls_1, ServiceFavoritesList, ServiceFavoritesList_1;
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
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (photo_util_1_1) {
                photo_util_1 = photo_util_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {/**
             * Created by orion on 16/03/2017.
             */
            ServiceFavoritesList = ServiceFavoritesList_1 = (function () {
                function ServiceFavoritesList(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                    // Observable source
                    this.source = new BehaviorSubject_1.BehaviorSubject(0);
                    // Observable stream
                    this.faveritesList$ = this.source.asObservable();
                }
                ServiceFavoritesList.packedPhoto = function (photo, sizes, favedate) {
                    var dim = photo_util_1.medium_of_sizes(sizes);
                    var pack = {
                        x_buddyicon: urls_1.getBuddyIconSrc(photo),
                        x_ownerpage: urls_1.photoOwnerPage(photo.id, photo.owner.nsid),
                        owner: photo.owner.nsid,
                        iconserver: photo.owner.iconserver,
                        farm: photo.owner.iconfarm,
                        url_m: urls_1.photoSrc(photo),
                        url_l: urls_1.photoLSrc(photo),
                        width_m: dim.width,
                        height_m: dim.height,
                        title: photo.title._content,
                        taken: photo.dates.taken,
                        posted: photo.dates.posted,
                        favedate: favedate,
                        strfavedate: util_1.dateFromUnixTimestamp(favedate),
                        id: photo.id,
                    };
                    var props = [
                        "views", "description", "secret", "originalsecret", "originalformat", "server",
                    ];
                    util_1.cloneProperties(props, photo, pack);
                    return pack;
                };
                ServiceFavoritesList.prototype.getPersonPhotos = function (items) {
                    var _this = this;
                    var photos = [];
                    var lenItems = items.length;
                    var _loop_1 = function (item) {
                        this_1.serviceSearch.getPhotosInfo(item.id).subscribe(function (info) {
                            _this.serviceSearch.getSizes(item.id).subscribe(function (sizes) {
                                var packed = ServiceFavoritesList_1.packedPhoto(info, sizes, item.favedate);
                                photos.push(packed);
                                if (--lenItems === 0) {
                                    _this.source.next(photos);
                                }
                            });
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var item = items_1[_i];
                        _loop_1(item);
                    }
                };
                return ServiceFavoritesList;
            }());
            ServiceFavoritesList = ServiceFavoritesList_1 = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], ServiceFavoritesList);
            exports_1("ServiceFavoritesList", ServiceFavoritesList);
        }
    };
});
//# sourceMappingURL=service.favoriteslist.js.map