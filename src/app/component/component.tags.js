System.register(["@angular/core", "../service/service.search", "@angular/http", "../service/service.storage"], function (exports_1, context_1) {
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
    var core_1, service_search_1, http_1, service_storage_1, TagsComponent;
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
            }
        ],
        execute: function () {
            TagsComponent = (function () {
                function TagsComponent(serviceSearch, serviceStorage) {
                    this.serviceSearch = serviceSearch;
                    this.serviceStorage = serviceStorage;
                    this.waiting = false;
                }
                TagsComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    this.fetch();
                };
                TagsComponent.prototype.retrieveFromStorage = function () {
                    this.count = parseInt(this.serviceStorage.get("tagcount"), 10) || 15;
                    this.period = this.serviceStorage.get("period") || "day";
                };
                TagsComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.set("tagcount", this.count.toString());
                    this.serviceStorage.set("period", this.period);
                };
                TagsComponent.prototype.fetch = function () {
                    var _this = this;
                    this.persistToStorage();
                    var searchParams = new http_1.URLSearchParams();
                    searchParams.append("count", this.count.toString());
                    searchParams.append("period", this.period);
                    this.waiting = true;
                    this.serviceSearch.getTags(searchParams).subscribe(function (tags) {
                        _this.tags = tags;
                        _this.waiting = false;
                    });
                };
                return TagsComponent;
            }());
            TagsComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/tags.html",
                    styleUrls: ["../../css/browse.css"],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch,
                    service_storage_1.ServiceStorage])
            ], TagsComponent);
            exports_1("TagsComponent", TagsComponent);
        }
    };
});
//# sourceMappingURL=component.tags.js.map