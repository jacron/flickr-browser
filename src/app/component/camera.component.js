System.register(["@angular/core", "../helpers/util", "../service/service.add-favorites", "../service/service.photos", "../service/service.search", "../service/service.storage"], function (exports_1, context_1) {
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
    var core_1, util_1, service_add_favorites_1, service_photos_1, service_search_1, service_storage_1, CAMERAS_IN_STORE, CameraComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (service_add_favorites_1_1) {
                service_add_favorites_1 = service_add_favorites_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            }
        ],
        execute: function () {
            CAMERAS_IN_STORE = "filter.cameras";
            CameraComponent = (function () {
                function CameraComponent(serviceSearch, servicePhotos, serviceStorage, serviceAddFavorites) {
                    this.serviceSearch = serviceSearch;
                    this.servicePhotos = servicePhotos;
                    this.serviceStorage = serviceStorage;
                    this.serviceAddFavorites = serviceAddFavorites;
                    this.selectedCamera = "";
                    this.my = true;
                    this.waiting = false;
                    this.subscription = null;
                }
                CameraComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    if (!this.cameras) {
                        this.getCameras();
                    }
                    this.servicePhotos.initPhotos();
                };
                CameraComponent.prototype.retrieveFromStorage = function () {
                    this.cameras = this.serviceStorage.getJSON(CAMERAS_IN_STORE);
                    console.log("retrieved from storage");
                };
                CameraComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.setJSON(CAMERAS_IN_STORE, this.cameras);
                };
                CameraComponent.prototype.addCamera = function (camera) {
                    if (this.cameras.indexOf(camera) === -1 && camera.length !== 0) {
                        this.cameras.push(camera);
                    }
                };
                CameraComponent.prototype.addToCameras = function (photos) {
                    var _this = this;
                    var photosTodo = photos.length;
                    for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                        var photo = photos_1[_i];
                        this.serviceSearch.getExif(photo.id).subscribe(function (data) {
                            if (data) {
                                _this.addCamera(data.camera);
                            }
                            if (--photosTodo === 0) {
                                if (--_this.pagesTodo === 0) {
                                    util_1.sortAlphaNumAsc(_this.cameras);
                                    _this.persistToStorage();
                                    _this.waiting = false;
                                }
                            }
                        });
                    }
                };
                CameraComponent.prototype.getCameras = function () {
                    var _this = this;
                    var perPage = 50; // max allowed: 500 (use smaller number than total, to practice the algoritm)
                    this.serviceSearch.myPhotosTotal().subscribe(function (total) {
                        if (total) {
                            _this.waiting = true;
                            var pages = util_1.calcPagesFromTotal(total, perPage);
                            _this.pagesTodo = pages;
                            for (var i = 0; i < pages; i++) {
                                _this.cameras = [];
                                _this.serviceSearch.myPhotosPage(i + 1, perPage, false).subscribe(function (photos) {
                                    if (photos && photos.photo.length > 0) {
                                        _this.addToCameras(photos.photo);
                                    }
                                    else {
                                        console.log("empty result");
                                    }
                                });
                            }
                        }
                    });
                };
                CameraComponent.prototype.prevPage = function () {
                    if (this.servicePhotos.prevPage()) {
                        // this.fetchLensModel(false);
                    }
                };
                CameraComponent.prototype.nextPage = function () {
                    if (this.servicePhotos.nextPage()) {
                        // this.fetchLensModel(false);
                    }
                };
                CameraComponent.prototype.onKey = function (e) {
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
                CameraComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                CameraComponent.prototype.addFavorites = function () {
                    var _this = this;
                    this.subscription = this.serviceAddFavorites.stream$.subscribe(function (response) {
                        if (response) {
                            _this.waiting = false;
                        }
                    });
                    this.serviceAddFavorites.addFavorites(this.servicePhotos.photos);
                };
                CameraComponent.prototype.filterPhotosOnCamera = function (photos) {
                    var _this = this;
                    var photosTodo = photos.length;
                    var _loop_1 = function (photo) {
                        this_1.serviceSearch.getExif(photo.id).subscribe(function (data) {
                            if (data) {
                                if (data.camera === _this.selectedCamera) {
                                    _this.servicePhotos.addPhoto(photo);
                                }
                            }
                            if (--photosTodo === 0) {
                                if (--_this.pagesTodo === 0) {
                                    if (_this.servicePhotos.photos.length > 1) {
                                        _this.servicePhotos.justify();
                                    }
                                    _this.addFavorites();
                                }
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, photos_2 = photos; _i < photos_2.length; _i++) {
                        var photo = photos_2[_i];
                        _loop_1(photo);
                    }
                };
                CameraComponent.prototype.fetchCamera = function (init) {
                    var _this = this;
                    var perPage = 50; // max allowed: 500 (use smaller number than total, to practice the algoritm)
                    if (init) {
                        this.servicePhotos.resetPage();
                    }
                    this.serviceSearch.myPhotosTotal().subscribe(function (total) {
                        if (total) {
                            _this.waiting = true;
                            var pages = util_1.calcPagesFromTotal(total, perPage);
                            _this.pagesTodo = pages;
                            _this.servicePhotos.initPhotos();
                            for (var i = 0; i < pages; i++) {
                                _this.serviceSearch.myPhotosPage(i + 1, perPage, true).subscribe(function (photos) {
                                    if (photos && photos.photo.length > 0) {
                                        _this.filterPhotosOnCamera(photos.photo);
                                    }
                                    else {
                                        console.log("empty result");
                                    }
                                });
                            }
                        }
                    });
                };
                CameraComponent.prototype.selectCamera = function (camera) {
                    this.selectedCamera = camera;
                    this.fetchCamera(true);
                };
                return CameraComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], CameraComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], CameraComponent.prototype, "onResize", null);
            CameraComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/camera.html",
                    styleUrls: ["./css/browse.css", "./css/link.css"],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch,
                    service_photos_1.ServicePhotos,
                    service_storage_1.ServiceStorage,
                    service_add_favorites_1.ServiceAddFavorites])
            ], CameraComponent);
            exports_1("CameraComponent", CameraComponent);
        }
    };
});
//# sourceMappingURL=camera.component.js.map
