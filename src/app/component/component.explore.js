System.register(["@angular/core", "../service/service.storage", "../service/service.photos", "@angular/http", "../service/service.search", "../helpers/util", "../service/service.add-favorites"], function (exports_1, context_1) {
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
    var core_1, service_storage_1, service_photos_1, http_1, service_search_1, util_1, service_add_favorites_1, STORAGE_PARMS, ExploreComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (service_add_favorites_1_1) {
                service_add_favorites_1 = service_add_favorites_1_1;
            }
        ],
        execute: function () {
            /**
             * Created by orion on 07/03/2017.
             */
            STORAGE_PARMS = "explore.per_page";
            ExploreComponent = (function () {
                function ExploreComponent(serviceStorage, serviceSearch, servicePhotos, serviceAddFavorites) {
                    this.serviceStorage = serviceStorage;
                    this.serviceSearch = serviceSearch;
                    this.servicePhotos = servicePhotos;
                    this.serviceAddFavorites = serviceAddFavorites;
                    this.waiting = false;
                }
                ExploreComponent.prototype.ngOnInit = function () {
                    this.servicePhotos.initPhotos();
                    this.servicePhotos.resetPage();
                    this.date = "";
                    this.retrievePerPageFromStorage();
                };
                ExploreComponent.prototype.retrievePerPageFromStorage = function () {
                    this.servicePhotos.perPage = parseInt(this.serviceStorage.get(STORAGE_PARMS), 10) || 15;
                };
                ExploreComponent.prototype.persistPerPageToStorage = function () {
                    this.serviceStorage.set(STORAGE_PARMS, this.servicePhotos.perPage.toString());
                };
                ExploreComponent.prototype.getExploreDate = function () {
                    this.date = util_1.isoDateToString(new Date());
                    this.prevDay();
                };
                ExploreComponent.prototype.prevDay = function () {
                    if (this.date === "") {
                        this.getExploreDate();
                    }
                    var d = util_1.stringToIsoDate(this.date);
                    d.setDate(d.getDate() - 1);
                    this.date = util_1.isoDateToString(d);
                    this.explore(true);
                };
                ExploreComponent.prototype.nextDay = function () {
                    if (this.date === "") {
                        return;
                    }
                    var d = util_1.stringToIsoDate(this.date);
                    d.setDate(d.getDate() + 1);
                    this.date = util_1.isoDateToString(d);
                    this.explore(true);
                };
                ExploreComponent.prototype.voidDate = function () {
                    this.date = "";
                    this.explore(true);
                };
                ExploreComponent.prototype.prevPage = function () {
                    if (this.servicePhotos.prevPage()) {
                        this.explore(false);
                    }
                };
                ExploreComponent.prototype.nextPage = function () {
                    if (this.servicePhotos.nextPage()) {
                        this.explore(false);
                    }
                };
                ExploreComponent.prototype.closeDetails = function () {
                    this.servicePhotos.clearPhoto();
                };
                ExploreComponent.prototype.onKey = function (e) {
                    this.servicePhotos.photoOnKey(e);
                    if (!this.servicePhotos.photo && e.target.localName !== "input") {
                        switch (e.key) {
                            case "ArrowRight":
                                this.nextPage();
                                break;
                            case "ArrowLeft":
                                this.prevPage();
                                break;
                        }
                    }
                };
                ExploreComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                ExploreComponent.prototype.selectPhoto = function (data) {
                    this.servicePhotos.select(data);
                    document.getElementById("top").scrollIntoView();
                };
                ExploreComponent.prototype.nextPhoto = function () {
                    this.servicePhotos.nextPhoto();
                };
                ExploreComponent.prototype.prevPhoto = function () {
                    this.servicePhotos.prevPhoto();
                };
                ExploreComponent.prototype.addFavorites = function () {
                    this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
                };
                ExploreComponent.prototype.explore = function (init) {
                    var _this = this;
                    this.waiting = true;
                    if (init) {
                        this.servicePhotos.resetPage();
                    }
                    this.closeDetails();
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("per_page", this.servicePhotos.strPerPage());
                    searchParams.append("page", this.servicePhotos.strPage());
                    if (this.date !== "") {
                        searchParams.append("date", this.date);
                    }
                    this.serviceSearch.explore(searchParams)
                        .subscribe(function (data) {
                        _this.servicePhotos.photos = data.items;
                        _this.servicePhotos.total = data.total;
                        _this.servicePhotos.pages = data.pages;
                        _this.servicePhotos.justify();
                        _this.addFavorites();
                        _this.waiting = false;
                        _this.persistPerPageToStorage();
                    });
                };
                return ExploreComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], ExploreComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExploreComponent.prototype, "onResize", null);
            ExploreComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/explore.html",
                    styleUrls: ["../../css/browse.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_search_1.ServiceSearch,
                    service_photos_1.ServicePhotos,
                    service_add_favorites_1.ServiceAddFavorites])
            ], ExploreComponent);
            exports_1("ExploreComponent", ExploreComponent);
        }
    };
});
//# sourceMappingURL=component.explore.js.map