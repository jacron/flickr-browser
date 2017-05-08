System.register(["@angular/core", "../service/service.storage", "../service/service.favorites", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, service_storage_1, service_favorites_1, router_1, favoritesMinCount, favoritesPersons, favoritesFavoritesCount, FavoritesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_favorites_1_1) {
                service_favorites_1 = service_favorites_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            /**
             * Created by orion on 13/03/2017.
             */
            favoritesMinCount = "favorites.minCount";
            exports_1("favoritesPersons", favoritesPersons = "favorites.persons");
            favoritesFavoritesCount = "favorites.favoritesCount";
            FavoritesComponent = (function () {
                function FavoritesComponent(serviceStorage, serviceFavorites, router) {
                    this.serviceStorage = serviceStorage;
                    this.serviceFavorites = serviceFavorites;
                    this.router = router;
                    this.subscription = null;
                    this.waiting = false;
                }
                FavoritesComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    if (this.persons) {
                        console.log("retrieved from storage");
                    }
                    else {
                        this.search();
                    }
                };
                FavoritesComponent.prototype.ngOnDestroy = function () {
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                    }
                };
                FavoritesComponent.prototype.navigateToList = function (nsid) {
                    this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
                    this.router.navigate(["/favoritelist", nsid]).then();
                };
                FavoritesComponent.prototype.retrieveFromStorage = function () {
                    var minCount = parseInt(this.serviceStorage.get(favoritesMinCount), 10);
                    if (isNaN(minCount)) {
                        minCount = 1;
                    }
                    var favoritesCount = parseInt(this.serviceStorage.get(favoritesFavoritesCount), 10);
                    if (isNaN(favoritesCount)) {
                        favoritesCount = -1;
                    }
                    this.persons = this.serviceStorage.getJSON(favoritesPersons) || [];
                    this.minCount = minCount;
                    this.favoritesCount = favoritesCount;
                };
                FavoritesComponent.prototype.storeMinCount = function () {
                    // console.log('storing mincount');
                    this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
                };
                FavoritesComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.setJSON(favoritesPersons, this.persons);
                    this.serviceStorage.set(favoritesMinCount, this.minCount.toString());
                    this.serviceStorage.set(favoritesFavoritesCount, this.favoritesCount.toString());
                };
                FavoritesComponent.prototype.search = function () {
                    var _this = this;
                    this.waiting = true;
                    this.subscription = this.serviceFavorites.faverites$
                        .subscribe(function (data) {
                        if (data) {
                            _this.persons = data.persons;
                            _this.favoritesCount = data.favoritesCount;
                            _this.persistToStorage();
                            _this.waiting = false;
                        }
                    });
                    this.serviceFavorites.getFavorites();
                };
                return FavoritesComponent;
            }());
            FavoritesComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/favorites.html",
                    styleUrls: ["../../css/browse.css", "../../css/faverers.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_favorites_1.ServiceFavorites,
                    router_1.Router])
            ], FavoritesComponent);
            exports_1("FavoritesComponent", FavoritesComponent);
        }
    };
});
//# sourceMappingURL=component.favorites.js.map