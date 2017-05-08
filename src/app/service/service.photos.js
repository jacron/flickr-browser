System.register(["./service.justify", "@angular/core", "./service.photo-details", "./service.search"], function (exports_1, context_1) {
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
    var service_justify_1, core_1, service_photo_details_1, service_search_1, ServicePhotos;
    return {
        setters: [
            function (service_justify_1_1) {
                service_justify_1 = service_justify_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_photo_details_1_1) {
                service_photo_details_1 = service_photo_details_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            }
        ],
        execute: function () {
            ServicePhotos = (function () {
                function ServicePhotos(serviceJustify, servicePhotoDetails, serviceSearch) {
                    this.serviceJustify = serviceJustify;
                    this.servicePhotoDetails = servicePhotoDetails;
                    this.serviceSearch = serviceSearch;
                    this.waiting = false;
                }
                ServicePhotos.prototype.strPerPage = function () {
                    return this.perPage.toString();
                };
                ServicePhotos.prototype.strPage = function () {
                    return this.page.toString();
                };
                ServicePhotos.prototype.strPages = function () {
                    return this.pages.toString();
                };
                ServicePhotos.prototype.addPhoto = function (photo) {
                    this.photos.push(photo);
                };
                ServicePhotos.prototype.setPhotos = function (photos) {
                    this.photos = photos;
                };
                ServicePhotos.prototype.justify = function () {
                    this.serviceJustify.processPhotos(this.photos);
                };
                ServicePhotos.prototype.select = function (data) {
                    this.photo = data.photo;
                    this.index = data.index;
                };
                ServicePhotos.prototype.getOffset = function () {
                    return (this.page - 1) * this.perPage;
                };
                ServicePhotos.prototype.nextPhoto = function () {
                    if (this.index < this.photos.length - 1) {
                        this.index++;
                        this.photo = this.photos[this.index];
                        this.servicePhotoDetails.addToDetails(this.photo);
                    }
                };
                ServicePhotos.prototype.prevPhoto = function () {
                    if (this.index > 0) {
                        this.index--;
                        this.photo = this.photos[this.index];
                        this.servicePhotoDetails.addToDetails(this.photo);
                    }
                };
                ServicePhotos.prototype.resetPage = function () {
                    this.page = 1;
                };
                ServicePhotos.prototype.nextPage = function () {
                    if (this.page < this.pages) {
                        this.page++;
                        return true;
                    }
                    return false;
                };
                ServicePhotos.prototype.prevPage = function () {
                    if (this.page > 1) {
                        this.page--;
                        return true;
                    }
                    return false;
                };
                ServicePhotos.prototype.clearPhoto = function () {
                    this.photo = null;
                };
                ServicePhotos.prototype.initPhotos = function () {
                    this.photos = [];
                    this.page = 1;
                    this.pages = 1;
                    this.perPage = 15;
                };
                ServicePhotos.prototype.photoOnKey = function (e) {
                    if (this.photo) {
                        switch (e.key) {
                            case "Escape":
                                this.clearPhoto();
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
                ServicePhotos.prototype.photosOnKey = function (e) {
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
                };
                ServicePhotos.prototype.onKey = function (e) {
                    this.photoOnKey(e);
                    this.photosOnKey(e);
                };
                ServicePhotos.prototype.addFavorites = function () {
                    var _loop_1 = function (item) {
                        this_1.serviceSearch.getFavorites(item.id, 50).subscribe(function (response) {
                            if (response) {
                                item.favorites = response.favorites;
                                item.favoritesLen = response.count;
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _loop_1(item);
                    }
                };
                ServicePhotos.prototype.getGroupPhotos = function (id) {
                    var _this = this;
                    this.serviceSearch.groupsPoolsGetPhotos(id).subscribe(function (photos) {
                        _this.photos = photos;
                        _this.justify();
                        _this.addFavorites();
                    });
                };
                return ServicePhotos;
            }());
            ServicePhotos = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_justify_1.ServiceJustify,
                    service_photo_details_1.ServicePhotoDetails,
                    service_search_1.ServiceSearch])
            ], ServicePhotos);
            exports_1("ServicePhotos", ServicePhotos);
        }
    };
});
//# sourceMappingURL=service.photos.js.map