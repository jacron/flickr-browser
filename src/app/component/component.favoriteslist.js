System.register(["@angular/core", "@angular/router", "../service/service.storage", "../service/service.favoriteslist", "../service/service.photos", "../service/service.add-favorites", "./component.favorites", "../service/service.favorites"], function (exports_1, context_1) {
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
    var core_1, router_1, service_storage_1, service_favoriteslist_1, service_photos_1, service_add_favorites_1, component_favorites_1, service_favorites_1, FavoritesListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_favoriteslist_1_1) {
                service_favoriteslist_1 = service_favoriteslist_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (service_add_favorites_1_1) {
                service_add_favorites_1 = service_add_favorites_1_1;
            },
            function (component_favorites_1_1) {
                component_favorites_1 = component_favorites_1_1;
            },
            function (service_favorites_1_1) {
                service_favorites_1 = service_favorites_1_1;
            }
        ],
        execute: function () {
            FavoritesListComponent = (function () {
                function FavoritesListComponent(router, activatedRoute, serviceStorage, serviceFavoritesList, servicePhotos, serviceAddFavorites, serviceFavorites) {
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.serviceStorage = serviceStorage;
                    this.serviceFavoritesList = serviceFavoritesList;
                    this.servicePhotos = servicePhotos;
                    this.serviceAddFavorites = serviceAddFavorites;
                    this.serviceFavorites = serviceFavorites;
                    this.my = true; // work-around to avoid owner icons
                    this.subscriptionFavoritesList = null;
                    this.waiting = false;
                    this.message = {
                        text: "Hello!",
                        type: "alert",
                        show: false,
                    };
                    this.subscription = null;
                }
                FavoritesListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.waiting = true;
                    this.servicePhotos.initPhotos();
                    this.sub = this.activatedRoute.params.subscribe(function (params) {
                        /* tslint:disable:no-string-literal */
                        _this.nsid = params["nsid"];
                        _this.retrieveFromStorage();
                        _this.personPhotos();
                    });
                };
                FavoritesListComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                FavoritesListComponent.prototype.retrieveFromStorage = function () {
                    this.persons = this.serviceStorage.getJSON(component_favorites_1.favoritesPersons);
                };
                FavoritesListComponent.prototype.onKey = function (e) {
                    this.servicePhotos.photoOnKey(e);
                };
                FavoritesListComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                FavoritesListComponent.prototype.close = function () {
                    this.router.navigate(["/favorites"]).then();
                };
                FavoritesListComponent.prototype.getPerson = function () {
                    // return this.persons.filter((person) => person.nsid === this.nsid);
                    for (var _i = 0, _a = this.persons; _i < _a.length; _i++) {
                        var person = _a[_i];
                        if (person.nsid === this.nsid) {
                            // console.log(person);
                            return person;
                        }
                    }
                    return null;
                };
                FavoritesListComponent.prototype.addFavorites = function () {
                    var _this = this;
                    this.subscription = this.serviceAddFavorites.stream$.subscribe(function (response) {
                        if (response) {
                            _this.waiting = false;
                        }
                    });
                    this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
                };
                FavoritesListComponent.prototype.personPhotos = function () {
                    var _this = this;
                    var person = this.getPerson();
                    if (person) {
                        this.waiting = true;
                        this.subscriptionFavoritesList = this.serviceFavoritesList.faveritesList$
                            .subscribe(function (photos) {
                            if (photos) {
                                photos.sort(function (a, b) {
                                    if (a.favedate > b.favedate) {
                                        return 1;
                                    }
                                    if (a.favedate < b.favedate) {
                                        return -1;
                                    }
                                    return 0;
                                });
                                _this.servicePhotos.setPhotos(photos);
                                _this.servicePhotos.justify();
                                _this.addFavorites();
                            }
                        });
                        this.serviceFavoritesList.getPersonPhotos(person.items);
                    }
                    else {
                        this.message.text = "Er zijn geen favorieten voor deze persoon";
                        this.message.show = true;
                        this.waiting = false;
                    }
                };
                FavoritesListComponent.prototype.refreshFavorites = function () {
                    var _this = this;
                    this.waiting = true;
                    this.subscription = this.serviceFavorites.faverites$
                        .subscribe(function (data) {
                        if (data) {
                            _this.serviceStorage.setJSON(component_favorites_1.favoritesPersons, data.persons);
                            _this.persons = data.persons;
                            _this.personPhotos();
                            // this.waiting = false;
                        }
                    });
                    this.serviceFavorites.getFavorites();
                };
                return FavoritesListComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], FavoritesListComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], FavoritesListComponent.prototype, "onResize", null);
            FavoritesListComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/favoriteslist.html",
                    styleUrls: ["./css/closer.css", "./css/link.css"],
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    router_1.ActivatedRoute,
                    service_storage_1.ServiceStorage,
                    service_favoriteslist_1.ServiceFavoritesList,
                    service_photos_1.ServicePhotos,
                    service_add_favorites_1.ServiceAddFavorites,
                    service_favorites_1.ServiceFavorites])
            ], FavoritesListComponent);
            exports_1("FavoritesListComponent", FavoritesListComponent);
        }
    };
});
//# sourceMappingURL=component.favoriteslist.js.map