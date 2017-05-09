System.register(["@angular/core", "../service/service.storage", "@angular/router", "../service/service.photos", "../service/service.favoriteslist", "../service/service.add-favorites", "../helpers/util", "./component.faverers", "./component.favorites", "../service/service.favorites"], function (exports_1, context_1) {
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
    var core_1, service_storage_1, router_1, service_photos_1, service_favoriteslist_1, service_add_favorites_1, util_1, component_faverers_1, component_favorites_1, service_favorites_1, FaverersListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (service_favoriteslist_1_1) {
                service_favoriteslist_1 = service_favoriteslist_1_1;
            },
            function (service_add_favorites_1_1) {
                service_add_favorites_1 = service_add_favorites_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (component_faverers_1_1) {
                component_faverers_1 = component_faverers_1_1;
            },
            function (component_favorites_1_1) {
                component_favorites_1 = component_favorites_1_1;
            },
            function (service_favorites_1_1) {
                service_favorites_1 = service_favorites_1_1;
            }
        ],
        execute: function () {
            FaverersListComponent = (function () {
                function FaverersListComponent(serviceStorage, activatedRoute, router, servicePhotos, serviceFavoritesList, serviceAddFavorites, serviceFavorites) {
                    this.serviceStorage = serviceStorage;
                    this.activatedRoute = activatedRoute;
                    this.router = router;
                    this.servicePhotos = servicePhotos;
                    this.serviceFavoritesList = serviceFavoritesList;
                    this.serviceAddFavorites = serviceAddFavorites;
                    this.serviceFavorites = serviceFavorites;
                    this.waiting = false;
                    this.my = true;
                    this.subscription = null;
                    this.subscriptionFavoritesList = null;
                    this.message = {
                        text: "Hello!",
                        type: "alert",
                        show: false,
                    };
                }
                FaverersListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.activatedRoute.params.subscribe(function (params) {
                        /* tslint:disable:no-string-literal */
                        _this.nsid = params["nsid"];
                        _this.retrieveFromStorage();
                        _this.getFavPhotos();
                        _this.getFavorites();
                    });
                };
                FaverersListComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                    }
                    if (this.subscriptionFavoritesList) {
                        this.subscriptionFavoritesList.unsubscribe();
                    }
                };
                FaverersListComponent.prototype.getPerson = function () {
                    for (var _i = 0, _a = this.persons; _i < _a.length; _i++) {
                        var person = _a[_i];
                        if (person.nsid === this.nsid) {
                            return person;
                        }
                    }
                };
                FaverersListComponent.prototype.addFavorites = function () {
                    var _this = this;
                    this.subscription = this.serviceAddFavorites.stream$.subscribe(function (response) {
                        if (response) {
                            _this.waiting = false;
                        }
                    });
                    this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
                };
                FaverersListComponent.prototype.retrieveFromStorage = function () {
                    this.persons = this.serviceStorage.getJSON(component_faverers_1.faverersPersons);
                };
                FaverersListComponent.prototype.onKey = function (e) {
                    this.servicePhotos.photoOnKey(e);
                };
                FaverersListComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                FaverersListComponent.prototype.close = function () {
                    this.router.navigate(["/faverers"]).then();
                };
                FaverersListComponent.prototype.personPhotos = function () {
                    var _this = this;
                    this.subscriptionFavoritesList = this.serviceFavoritesList.faveritesList$
                        .subscribe(function (photos) {
                        if (photos) {
                            util_1.sortField(photos, "favedate", util_1.sort_direction.Asc, util_1.sort_type.Alphanum);
                            _this.servicePhotos.setPhotos(photos);
                            _this.servicePhotos.justify();
                            _this.addFavorites();
                        }
                    });
                    this.serviceFavoritesList.getPersonPhotos(this.getPerson().items);
                };
                FaverersListComponent.prototype.getFavPhotos = function () {
                    this.servicePhotos.initPhotos();
                    this.personPhotos();
                };
                FaverersListComponent.prototype.setFavorites = function (persons) {
                    this.favorites = [];
                    if (persons.length > 0) {
                        this.favorites = persons[0].items;
                    }
                };
                FaverersListComponent.prototype.getFavorites = function () {
                    var _this = this;
                    var persons = this.serviceStorage.getJSON(component_favorites_1.favoritesPersons).filter(function (person) { return person.nsid === _this.nsid; });
                    this.setFavorites(persons);
                };
                FaverersListComponent.prototype.refreshFavorites = function () {
                    var _this = this;
                    this.waiting = true;
                    this.subscription = this.serviceFavorites.faverites$
                        .subscribe(function (data) {
                        if (data) {
                            _this.serviceStorage.setJSON(component_favorites_1.favoritesPersons, data.persons);
                            _this.getFavorites();
                            _this.waiting = false;
                        }
                    });
                    this.serviceFavorites.getFavorites();
                };
                return FaverersListComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], FaverersListComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], FaverersListComponent.prototype, "onResize", null);
            FaverersListComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/favererslist.html",
                    styleUrls: ["./css/closer.css", "./css/favererslist.css", "./css/link.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    router_1.ActivatedRoute,
                    router_1.Router,
                    service_photos_1.ServicePhotos,
                    service_favoriteslist_1.ServiceFavoritesList,
                    service_add_favorites_1.ServiceAddFavorites,
                    service_favorites_1.ServiceFavorites])
            ], FaverersListComponent);
            exports_1("FaverersListComponent", FaverersListComponent);
        }
    };
});
//# sourceMappingURL=favererslist.component.js.map
