System.register(["@angular/core", "../helpers/history", "../service/service.search", "../service/service.searchsettings", "../service/service.storage", "../api.config", "../helpers/util", "../service/service.photos"], function (exports_1, context_1) {
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
    var core_1, history_1, service_search_1, service_searchsettings_1, service_storage_1, apiConfig, util_1, service_photos_1, BrowseComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (history_1_1) {
                history_1 = history_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (service_searchsettings_1_1) {
                service_searchsettings_1 = service_searchsettings_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (apiConfig_1) {
                apiConfig = apiConfig_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            }
        ],
        execute: function () {
            BrowseComponent = (function () {
                function BrowseComponent(serviceSearch, serviceStorage, searchSettings, servicePhotos) {
                    this.serviceSearch = serviceSearch;
                    this.serviceStorage = serviceStorage;
                    this.searchSettings = searchSettings;
                    this.servicePhotos = servicePhotos;
                    this.waiting = false;
                    this.cardViewExpanded = true;
                    this.historyViewExpanded = false;
                    this.searchSortOptions = apiConfig.searchSortOptions;
                    this.message = {
                        text: "Hello!",
                        type: "alert",
                        show: false,
                    };
                    this.subscription = null;
                    this.history = new history_1.History();
                }
                BrowseComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    this.retrievePhotosFromStorage();
                    this.servicePhotos.resetPage();
                    this.servicePhotos.justify();
                    this.cardViewExpanded = true;
                    // console.log(this.history);
                };
                BrowseComponent.prototype.resetQuery = function (focusable) {
                    focusable.focus();
                    this.searchSettings.text = "";
                };
                BrowseComponent.prototype.toggleCardView = function () {
                    this.cardViewExpanded = !this.cardViewExpanded;
                };
                BrowseComponent.prototype.toggleHistoryView = function () {
                    this.historyViewExpanded = !this.historyViewExpanded;
                };
                BrowseComponent.prototype.persistPhotosToStorage = function () {
                    this.serviceStorage.setJSON("browse.photos", this.servicePhotos.photos);
                    this.serviceStorage.set("browse.total", this.servicePhotos.total);
                    this.serviceStorage.set("browse.pages", this.servicePhotos.strPages());
                };
                BrowseComponent.prototype.persistToStorage = function () {
                    this.searchSettings.persistToStorage();
                    this.serviceStorage.set("browse.per_page", this.servicePhotos.perPage);
                    this.serviceStorage.setJSON("browse.history", this.history.getItems());
                };
                BrowseComponent.prototype.retrievePhotosFromStorage = function () {
                    this.servicePhotos.photos = this.serviceStorage.getJSON("browse.photos");
                    if (this.servicePhotos.photos) {
                        console.log("retrieved photos");
                        this.servicePhotos.total = this.serviceStorage.get("browse.total");
                        this.servicePhotos.pages = +this.serviceStorage.get("browse.pages");
                    }
                };
                BrowseComponent.prototype.retrieveFromStorage = function () {
                    this.searchSettings.retrieveFromStorage();
                    this.history.setItems(this.serviceStorage.getJSON("browse.history"));
                    this.servicePhotos.perPage = this.serviceStorage.get("browse.per_page");
                };
                BrowseComponent.prototype.insertHistory = function (text) {
                    this.history.insertItem(text);
                };
                BrowseComponent.prototype.sortViewSort = function (items) {
                    if (this.searchSettings.viewSort === "views") {
                        return util_1.sortField(items, "views", util_1.sort_direction.Asc, util_1.sort_type.Int);
                    }
                    else if (this.searchSettings.viewSort === "-views") {
                        return util_1.sortField(items, "views", util_1.sort_direction.Desc, util_1.sort_type.Int);
                    }
                    return items;
                };
                BrowseComponent.prototype.prevPage = function () {
                    if (this.servicePhotos.prevPage()) {
                        this.search(false);
                    }
                };
                BrowseComponent.prototype.nextPage = function () {
                    if (this.servicePhotos.nextPage()) {
                        this.search(false);
                    }
                };
                BrowseComponent.prototype.selectPhoto = function (data) {
                    this.servicePhotos.select(data);
                };
                BrowseComponent.prototype.onKey = function (e) {
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
                BrowseComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                BrowseComponent.prototype.initSearch = function (init) {
                    if (init) {
                        this.servicePhotos.resetPage();
                        var t = this.searchSettings.text;
                        if (t && t !== " " && t !== "") {
                            this.insertHistory(this.searchSettings.text);
                        }
                    }
                    this.servicePhotos.clearPhoto();
                    this.persistToStorage();
                };
                BrowseComponent.prototype.openHistoryItem = function (item) {
                    this.searchSettings.text = item.text;
                    this.search(true);
                };
                BrowseComponent.prototype.removeHistoryItem = function (item) {
                    this.history.remove(item);
                    this.serviceStorage.setJSON("browse.history", this.history.getItems());
                };
                BrowseComponent.prototype.addFavorites = function (photos) {
                    var _this = this;
                    var photosLen = photos.length;
                    var _loop_1 = function (item) {
                        this_1.serviceSearch.getFavorites(item.id, 50).subscribe(function (response) {
                            if (response) {
                                item.favorites = response.favorites;
                                item.favoritesLen = response.count;
                                if (--photosLen === 0) {
                                    _this.persistPhotosToStorage();
                                }
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                        var item = photos_1[_i];
                        _loop_1(item);
                    }
                };
                BrowseComponent.prototype.search = function (init) {
                    var _this = this;
                    this.waiting = true;
                    this.initSearch(init);
                    var searchParams = this.searchSettings.getSearchParams();
                    searchParams.append("per_page", this.servicePhotos.perPage);
                    searchParams.append("page", this.servicePhotos.page);
                    // console.log(searchParams);
                    this.serviceSearch.search(searchParams)
                        .subscribe(function (data) {
                        if (data.items) {
                            _this.servicePhotos.photos = _this.sortViewSort(data.items);
                            _this.servicePhotos.total = data.total;
                            _this.servicePhotos.pages = data.pages;
                            _this.servicePhotos.justify();
                            _this.addFavorites(_this.servicePhotos.photos);
                        }
                        else {
                            console.log(data);
                        }
                        _this.waiting = false;
                    });
                };
                return BrowseComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], BrowseComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], BrowseComponent.prototype, "onResize", null);
            BrowseComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/browse.html",
                    styleUrls: [
                        "../../css/browse.css",
                    ],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch,
                    service_storage_1.ServiceStorage,
                    service_searchsettings_1.ServiceSearchSettings,
                    service_photos_1.ServicePhotos])
            ], BrowseComponent);
            exports_1("BrowseComponent", BrowseComponent);
        }
    };
});
//# sourceMappingURL=component.browse.js.map