System.register(["@angular/core", "@angular/platform-browser", "../api.config", "../service/service.photos", "../service/service.search", "../service/service.storage", "../helpers/urls"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, api_config_1, service_photos_1, service_search_1, service_storage_1, urls_1, AlbumsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (api_config_1_1) {
                api_config_1 = api_config_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            AlbumsComponent = (function () {
                function AlbumsComponent(serviceStorage, serviceSearch, servicePhotos, sanatizer) {
                    this.serviceStorage = serviceStorage;
                    this.serviceSearch = serviceSearch;
                    this.servicePhotos = servicePhotos;
                    this.sanatizer = sanatizer;
                    this.albums = [];
                    this.waiting = false;
                    this.my = true;
                }
                AlbumsComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    this.servicePhotos.initPhotos();
                    this.servicePhotos.resetPage();
                    this.sanatizeSrc();
                };
                AlbumsComponent.prototype.sanatizeSrc = function () {
                    // Nodig omdat src in een dynamisch style element (background-image) wordt geplaatst.
                    for (var _i = 0, _a = this.albums; _i < _a.length; _i++) {
                        var album = _a[_i];
                        if (album.src) {
                            album.src = this.sanatizer.bypassSecurityTrustStyle("url(" + album.src + ")");
                        }
                    }
                };
                AlbumsComponent.prototype.retrieveFromStorage = function () {
                    this.albums = this.serviceStorage.getJSON("albums.albums");
                };
                AlbumsComponent.prototype.persistAlbumsToStorage = function () {
                    this.serviceStorage.setJSON("albums.albums", this.albums);
                };
                AlbumsComponent.prototype.fetchPhotos = function (album) {
                    var _this = this;
                    this.selectedAlbum = album;
                    this.serviceSearch.getAlbumPhotos(album.id).subscribe(function (data) {
                        // console.log(data.photo);
                        _this.servicePhotos.setPhotos(data.photo.map(function (item) {
                            // console.log(item);
                            item.owner = api_config_1.ownNsid; // dirty hack, but effective to make buddy data
                            return item;
                        }));
                        _this.servicePhotos.total = data.total;
                        _this.servicePhotos.pages = data.pages;
                        _this.servicePhotos.justify();
                        _this.servicePhotos.addFavorites();
                    });
                };
                AlbumsComponent.prototype.prevPage = function () {
                    if (this.servicePhotos.prevPage()) {
                        this.search(false);
                    }
                };
                AlbumsComponent.prototype.nextPage = function () {
                    if (this.servicePhotos.nextPage()) {
                        this.search(false);
                    }
                };
                AlbumsComponent.prototype.close = function () {
                    this.servicePhotos.initPhotos();
                };
                AlbumsComponent.prototype.onKey = function (e) {
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
                AlbumsComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                AlbumsComponent.prototype.search = function (init) {
                    var _this = this;
                    this.waiting = true;
                    if (init) {
                        this.servicePhotos.resetPage();
                    }
                    this.servicePhotos.initPhotos();
                    this.serviceSearch.getMyAlbums().subscribe(function (albums) {
                        _this.servicePhotos.initPhotos();
                        var albumsLen = albums.length;
                        var _loop_1 = function (album) {
                            album.name = album.title._content;
                            _this.serviceSearch.getPrimaryAlbumPhoto(album.id).subscribe((function (data) {
                                if (data.primary) {
                                    album.src = urls_1.photoSrc(data.primary);
                                }
                                else {
                                    album.src = null;
                                }
                                album.count = data.count;
                                if (--albumsLen === 0) {
                                    _this.albums = albums;
                                    _this.persistAlbumsToStorage();
                                    _this.sanatizeSrc();
                                }
                            }));
                        };
                        for (var _i = 0, albums_1 = albums; _i < albums_1.length; _i++) {
                            var album = albums_1[_i];
                            _loop_1(album);
                        }
                        _this.waiting = false;
                    });
                };
                return AlbumsComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], AlbumsComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AlbumsComponent.prototype, "onResize", null);
            AlbumsComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/albums.html",
                    styleUrls: ["./css/closer.css", "./css/album.css", "./css/browse.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_search_1.ServiceSearch,
                    service_photos_1.ServicePhotos,
                    platform_browser_1.DomSanitizer])
            ], AlbumsComponent);
            exports_1("AlbumsComponent", AlbumsComponent);
        }
    };
});
//# sourceMappingURL=albums.component.js.map
