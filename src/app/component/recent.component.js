System.register(["@angular/core", "../service/service.search", "@angular/http", "../service/service.storage", "../service/service.justify", "../service/service.photo-details", "../helpers/urls"], function (exports_1, context_1) {
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
    var core_1, service_search_1, http_1, service_storage_1, service_justify_1, service_photo_details_1, urls_1, RecentComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_justify_1_1) {
                service_justify_1 = service_justify_1_1;
            },
            function (service_photo_details_1_1) {
                service_photo_details_1 = service_photo_details_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            RecentComponent = (function () {
                function RecentComponent(serviceSearch, serviceStorage, serviceJustify, servicePhotoDetails) {
                    this.serviceSearch = serviceSearch;
                    this.serviceStorage = serviceStorage;
                    this.serviceJustify = serviceJustify;
                    this.servicePhotoDetails = servicePhotoDetails;
                    this.waiting = false;
                }
                RecentComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    this.page = 1;
                };
                RecentComponent.prototype.retrieveFromStorage = function () {
                    this.count = parseInt(this.serviceStorage.get("recent.count"), 10) || 15;
                    this.date = this.serviceStorage.get("recent.date") || "";
                };
                RecentComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.set("recent.count", this.count.toString());
                    this.serviceStorage.set("recent.date", this.date);
                };
                RecentComponent.prototype.prevPage = function () {
                    this.page--;
                    this.search(false);
                };
                RecentComponent.prototype.nextPage = function () {
                    this.page++;
                    this.search(false);
                };
                RecentComponent.prototype.closeDetails = function () {
                    this.photo = null;
                };
                RecentComponent.prototype.onKey = function (e) {
                    if (!this.photo && e.target.localName !== "input") {
                        switch (e.key) {
                            case "ArrowRight":
                                this.nextPage();
                                break;
                            case "ArrowLeft":
                                this.prevPage();
                                break;
                        }
                    }
                    if (this.photo) {
                        switch (e.key) {
                            case "Escape":
                                this.closeDetails();
                                break;
                            case "ArrowRight":
                                this.nextPhoto();
                                break;
                            case "ArrowLeft":
                                this.prevPhoto();
                                break;
                        }
                    }
                };
                RecentComponent.prototype.onResize = function () {
                    this.serviceJustify.processPhotos(this.photos);
                };
                RecentComponent.prototype.selectPhoto = function (data) {
                    this.photo = data.photo;
                    this.photoIndex = data.index;
                    document.getElementById("top").scrollIntoView();
                };
                RecentComponent.prototype.nextPhoto = function () {
                    if (this.photoIndex < this.photos.length - 1) {
                        this.photoIndex++;
                        this.photo = this.photos[this.photoIndex];
                        this.servicePhotoDetails.addToDetails(this.photo);
                    }
                };
                RecentComponent.prototype.prevPhoto = function () {
                    if (this.photoIndex > 0) {
                        this.photoIndex--;
                        this.photo = this.photos[this.photoIndex];
                        this.servicePhotoDetails.addToDetails(this.photo);
                    }
                };
                RecentComponent.prototype.initSearchParams = function () {
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("per_page", this.count.toString());
                    searchParams.append("page", this.page.toString());
                    searchParams.append("extras", urls_1.flickrUrls.extra.full);
                    return searchParams;
                };
                RecentComponent.prototype.search = function (init) {
                    var _this = this;
                    this.waiting = true;
                    if (init) {
                        this.page = 1;
                    }
                    this.photo = null;
                    this.persistToStorage();
                    this.serviceSearch.getRecent(this.initSearchParams())
                        .subscribe(function (data) {
                        _this.photos = data.items;
                        _this.total = data.total;
                        _this.pages = data.pages;
                        _this.waiting = false;
                        _this.serviceJustify.processPhotos(_this.photos);
                    });
                };
                return RecentComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], RecentComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], RecentComponent.prototype, "onResize", null);
            RecentComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/recent.html",
                    styleUrls: ["../../css/browse.css"],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch,
                    service_storage_1.ServiceStorage,
                    service_justify_1.ServiceJustify,
                    service_photo_details_1.ServicePhotoDetails])
            ], RecentComponent);
            exports_1("RecentComponent", RecentComponent);
        }
    };
});
//# sourceMappingURL=recent.component.js.map
