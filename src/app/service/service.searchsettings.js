System.register(["./service.storage", "@angular/http", "@angular/core", "../api.config", "../helpers/urls"], function (exports_1, context_1) {
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
    var service_storage_1, http_1, core_1, apiConfig, urls_1, ServiceSearchSettings;
    return {
        setters: [
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (apiConfig_1) {
                apiConfig = apiConfig_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            ServiceSearchSettings = (function () {
                function ServiceSearchSettings(serviceStorage) {
                    this.serviceStorage = serviceStorage;
                    this.text = "";
                    this.tags = "";
                    this.safe = "1";
                    this.sort = "date-posted-desc";
                    this.tagMode = "any";
                    this.tagsOrText = "text";
                    this.viewSort = "";
                    this.my = false;
                    this.myNsid = apiConfig.ownNsid;
                }
                ServiceSearchSettings.prototype.ngOnInit = function () {
                    this.myNsid = apiConfig.ownNsid;
                };
                ServiceSearchSettings.prototype.retrieveFromStorage = function () {
                    this.text = this.serviceStorage.get("text") || "";
                    this.tags = this.serviceStorage.get("tags") || "";
                    this.safe = this.serviceStorage.get("safe");
                    this.sort = this.serviceStorage.get("sort") || "date-posted-desc";
                    this.tagMode = this.serviceStorage.get("tag_mode") || "any";
                    this.tagsOrText = this.serviceStorage.get("tags_or_text") || "text";
                    this.my = this.serviceStorage.get("mine") === "true";
                    if (this.text === "undefined") {
                        this.text = " ";
                    }
                };
                ServiceSearchSettings.prototype.persistToStorage = function () {
                    this.serviceStorage.set("text", this.text);
                    this.serviceStorage.set("tags", this.tags);
                    this.serviceStorage.set("safe", this.safe);
                    this.serviceStorage.set("sort", this.sort);
                    this.serviceStorage.set("tag_mode", this.tagMode);
                    this.serviceStorage.set("mine", this.my.toString());
                };
                ServiceSearchSettings.prototype.getSearchParams = function () {
                    var searchParams = new http_1.URLSearchParams();
                    if (this.tagsOrText === "text") {
                        searchParams.append("text", this.text);
                    }
                    else {
                        searchParams.append("tags", this.text);
                    }
                    searchParams.append("safe_search", this.safe);
                    searchParams.append("extras", urls_1.flickrUrls.extra.full);
                    searchParams.append("content_type", "1");
                    if (this.my) {
                        searchParams.append("user_id", "53659177@N00");
                    }
                    searchParams.append("sort", this.sort);
                    searchParams.append("tag_mode", this.tagMode);
                    return searchParams;
                };
                return ServiceSearchSettings;
            }());
            ServiceSearchSettings = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage])
            ], ServiceSearchSettings);
            exports_1("ServiceSearchSettings", ServiceSearchSettings);
        }
    };
});
//# sourceMappingURL=service.searchsettings.js.map