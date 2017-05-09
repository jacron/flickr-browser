System.register(["@angular/core", "../service/service.storage", "../service/service.faverers", "@angular/router", "../service/service.search", "../helpers/util"], function (exports_1, context_1) {
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
    var core_1, service_storage_1, service_faverers_1, router_1, service_search_1, util_1, faverersMinCount, faverersPersons, faverersFavoritesCount, FaverersComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_faverers_1_1) {
                service_faverers_1 = service_faverers_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            /**
             * Created by orion on 10/03/2017.
             */
            faverersMinCount = "faverers.minCount";
            exports_1("faverersPersons", faverersPersons = "faverers.persons");
            faverersFavoritesCount = "faverers.favoritesCount";
            FaverersComponent = (function () {
                function FaverersComponent(serviceStorage, serviceFaverers, serviceSearch, router) {
                    this.serviceStorage = serviceStorage;
                    this.serviceFaverers = serviceFaverers;
                    this.serviceSearch = serviceSearch;
                    this.router = router;
                    this.persons = [];
                    this.waiting = false;
                    this.my = true;
                    this.subscription = null;
                    this.minCount = 1;
                    this.showCounts = false;
                }
                FaverersComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    if (this.persons) {
                        console.log("data fetched from storage");
                    }
                    else {
                        this.getFaverers();
                    }
                };
                FaverersComponent.prototype.ngOnDestroy = function () {
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                    }
                };
                FaverersComponent.prototype.retrieveFromStorage = function () {
                    var minCount = parseInt(this.serviceStorage.get(faverersMinCount), 10);
                    if (isNaN(minCount)) {
                        minCount = 1;
                    }
                    var favoritesCount = parseInt(this.serviceStorage.get(faverersFavoritesCount), 10);
                    if (isNaN(favoritesCount)) {
                        favoritesCount = -1;
                    }
                    this.minCount = minCount;
                    this.favoritesCount = favoritesCount;
                    this.persons = this.serviceStorage.getJSON(faverersPersons);
                };
                FaverersComponent.prototype.storeMinCount = function () {
                    // console.log('storing mincount');
                    this.serviceStorage.set(faverersMinCount, this.minCount.toString());
                };
                FaverersComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.set(faverersMinCount, this.minCount.toString());
                    this.serviceStorage.setJSON(faverersPersons, this.persons);
                    this.serviceStorage.set(faverersFavoritesCount, this.favoritesCount.toString());
                };
                FaverersComponent.prototype.navigateToList = function (nsid) {
                    this.serviceStorage.set(faverersMinCount, this.minCount.toString());
                    this.router.navigate(["/favererslist", nsid]).then();
                };
                FaverersComponent.prototype.getFaverers = function () {
                    var _this = this;
                    this.waiting = true;
                    this.subscription = this.serviceFaverers.faverers$
                        .subscribe(function (data) {
                        if (data) {
                            _this.persons = data.persons;
                            _this.favoritesCount = data.favoritesCount;
                            _this.persistToStorage();
                            _this.waiting = false;
                        }
                    });
                    this.serviceFaverers.getFaverers();
                };
                FaverersComponent.prototype.getCounts = function () {
                    var _this = this;
                    this.waiting = true;
                    var todo = this.persons.length;
                    this.persons.map(function (person) {
                        _this.serviceSearch.getUserFavoritesCount(person.nsid).subscribe(function (count) {
                            person.favorites_count = util_1.prettyNumber(count, ".");
                            if (--todo === 0) {
                                _this.waiting = false;
                                _this.showCounts = true;
                                _this.serviceStorage.setJSON("favs.persons", _this.persons);
                            }
                        });
                    });
                };
                return FaverersComponent;
            }());
            FaverersComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/faverers.html",
                    // template: `hello`,
                    styleUrls: ["./css/faverers.css", "./css/browse.css", "./css/link.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_faverers_1.ServiceFaverers,
                    service_search_1.ServiceSearch,
                    router_1.Router])
            ], FaverersComponent);
            exports_1("FaverersComponent", FaverersComponent);
        }
    };
});
//# sourceMappingURL=faverers.component.js.map
