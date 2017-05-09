System.register(["@angular/core", "../service/service.search", "../service/service.storage", "@angular/http", "../service/service.photos", "../service/service.add-favorites", "../service/service.add-comments", "../helpers/urls"], function (exports_1, context_1) {
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
    var core_1, service_search_1, service_storage_1, http_1, service_photos_1, service_add_favorites_1, service_add_comments_1, urls_1, MyComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (service_add_favorites_1_1) {
                service_add_favorites_1 = service_add_favorites_1_1;
            },
            function (service_add_comments_1_1) {
                service_add_comments_1 = service_add_comments_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            MyComponent = (function () {
                function MyComponent(serviceSearch, serviceStorage, servicePhotos, serviceAddFavorites, serviceAddComments) {
                    this.serviceSearch = serviceSearch;
                    this.serviceStorage = serviceStorage;
                    this.servicePhotos = servicePhotos;
                    this.serviceAddFavorites = serviceAddFavorites;
                    this.serviceAddComments = serviceAddComments;
                    this.categoryOptions = [
                        { value: "faves", name: "faves" },
                        { value: "views", name: "views" },
                        { value: "comments", name: "comments" },
                        { value: "interesting", name: "in" +
                                "teresting" },
                    ];
                    this.my = true;
                    this.waiting = false;
                    this.subscriptionFav = null;
                    this.subscriptionCom = null;
                }
                MyComponent.prototype.ngOnInit = function () {
                    this.servicePhotos.initPhotos();
                    this.servicePhotos.resetPage();
                    this.retrieveFromStorage();
                    // console.log(this.servicePhotos.photos);
                    // this.servicePhotos.justify();
                    this.search(true);
                };
                MyComponent.prototype.retrieveFromStorage = function () {
                    this.servicePhotos.perPage = parseInt(this.serviceStorage.get("my.per_page"), 10) || 15;
                    this.category = this.serviceStorage.get("my.category") || "interesting";
                    // this.servicePhotos.setPhotos(this.serviceStorage.getJSON('my.photos'));
                    // this.servicePhotos.pages = this.serviceStorage.get('my.pages');
                    // this.servicePhotos.total = this.serviceStorage.get('my.total');
                };
                MyComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.set("my.per_page", this.servicePhotos.strPerPage());
                    this.serviceStorage.set("my.category", this.category);
                    this.serviceStorage.setJSON("my.photos", this.servicePhotos.photos);
                    this.serviceStorage.set("my.pages", this.servicePhotos.pages);
                    this.serviceStorage.set("my.total", this.servicePhotos.total);
                };
                MyComponent.prototype.initSearchParams = function () {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("per_page", this.servicePhotos.strPerPage());
                    searchParams.append("page", this.servicePhotos.strPage());
                    searchParams.append("sort", this.category);
                    searchParams.append("extras", urls_1.flickrUrls.extra.full);
                    return searchParams;
                };
                MyComponent.prototype.prevPage = function () {
                    if (this.servicePhotos.prevPage()) {
                        this.search(false);
                    }
                };
                MyComponent.prototype.nextPage = function () {
                    if (this.servicePhotos.nextPage()) {
                        this.search(false);
                    }
                };
                MyComponent.prototype.closeDetails = function () {
                    this.servicePhotos.clearPhoto();
                };
                MyComponent.prototype.onKey = function (e) {
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
                    this.servicePhotos.photoOnKey(e);
                };
                MyComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                MyComponent.prototype.addFavorites = function () {
                    var _this = this;
                    this.subscriptionFav = this.serviceAddFavorites.stream$.subscribe(function (response) {
                        if (response) {
                            _this.serviceStorage.setJSON("my.photos", _this.servicePhotos.photos);
                        }
                    });
                    this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
                };
                MyComponent.prototype.addComments = function () {
                    this.subscriptionCom = this.serviceAddComments.stream$.subscribe(function () {
                        // if (response) {
                        //     console.log(response);
                        // }
                    });
                    this.serviceAddComments.addComments(this.servicePhotos.photos);
                };
                MyComponent.prototype.search = function (init) {
                    var _this = this;
                    this.waiting = true;
                    if (init) {
                        this.servicePhotos.resetPage();
                    }
                    this.servicePhotos.clearPhoto();
                    this.serviceSearch.getMyPopular(this.initSearchParams())
                        .subscribe(function (data) {
                        // bug in api: total always is same as per_page, pages always is one
                        _this.servicePhotos.photos = data.items;
                        _this.servicePhotos.total = data.total;
                        var pages = data.pages;
                        if (pages === 1) {
                            pages = 999;
                        }
                        _this.servicePhotos.pages = pages;
                        _this.waiting = false;
                        _this.servicePhotos.justify();
                        _this.addFavorites();
                        _this.addComments();
                        _this.persistToStorage();
                    });
                };
                MyComponent.prototype.nextScrolledPage = function () {
                    console.log("scrolled...");
                    // this.after += this.count;
                    // this.fetchPage();
                };
                return MyComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], MyComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyComponent.prototype, "onResize", null);
            MyComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/my.html",
                    styleUrls: ["../../css/browse.css"],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch,
                    service_storage_1.ServiceStorage,
                    service_photos_1.ServicePhotos,
                    service_add_favorites_1.ServiceAddFavorites,
                    service_add_comments_1.ServiceAddComments])
            ], MyComponent);
            exports_1("MyComponent", MyComponent);
        }
    };
});
//# sourceMappingURL=my.component.js.map
