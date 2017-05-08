System.register(["@angular/core", "rxjs/BehaviorSubject", "./service.search"], function (exports_1, context_1) {
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
    var core_1, BehaviorSubject_1, service_search_1, ServiceAddFavorites;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            }
        ],
        execute: function () {
            ServiceAddFavorites = (function () {
                function ServiceAddFavorites(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                    // Observable source
                    this.source = new BehaviorSubject_1.BehaviorSubject(0);
                    // Observable stream
                    this.stream$ = this.source.asObservable();
                }
                ServiceAddFavorites.prototype.addFavorites = function (photos) {
                    var _this = this;
                    var photosLen = photos.length;
                    var _loop_1 = function (item) {
                        this_1.serviceSearch.getFavorites(item.id, 50).subscribe(function (response) {
                            if (response) {
                                item.favorites = response.favorites;
                                item.favoritesLen = response.count;
                            }
                            if (--photosLen === 0) {
                                _this.source.next(true);
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                        var item = photos_1[_i];
                        _loop_1(item);
                    }
                };
                return ServiceAddFavorites;
            }());
            ServiceAddFavorites = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], ServiceAddFavorites);
            exports_1("ServiceAddFavorites", ServiceAddFavorites);
        }
    };
});
//# sourceMappingURL=service.add-favorites.js.map