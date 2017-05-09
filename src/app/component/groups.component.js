System.register(["@angular/core", "../service/service.search", "../helpers/util", "@angular/router", "../service/service.storage"], function (exports_1, context_1) {
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
    var core_1, service_search_1, util_1, router_1, service_storage_1, GroupsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            }
        ],
        execute: function () {
            GroupsComponent = (function () {
                function GroupsComponent(serviceStorage, serviceSearch, router) {
                    this.serviceStorage = serviceStorage;
                    this.serviceSearch = serviceSearch;
                    this.router = router;
                    this.waiting = false;
                    this.my = true;
                }
                GroupsComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    if (!this.groups) {
                        this.getGroups();
                    }
                };
                GroupsComponent.prototype.retrieveFromStorage = function () {
                    this.groups = this.serviceStorage.getJSON("groups");
                };
                GroupsComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.setJSON("groups", this.groups);
                };
                GroupsComponent.prototype.getGroups = function () {
                    var _this = this;
                    this.waiting = true;
                    this.serviceSearch.getPublicGroups().subscribe(function (groups) {
                        _this.groups = groups;
                        util_1.sortField(_this.groups, "name", util_1.sort_direction.Asc, util_1.sort_type.Alphanum);
                        _this.persistToStorage();
                        _this.waiting = false;
                    });
                };
                GroupsComponent.prototype.navigateToList = function (nsid) {
                    this.router.navigate(["/grouplist", nsid]).then();
                };
                return GroupsComponent;
            }());
            GroupsComponent = __decorate([
                core_1.Component({
                    templateUrl: "../partials/groups.html",
                    styleUrls: ["../../css/browse.css", "../../css/faverers.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_search_1.ServiceSearch,
                    router_1.Router])
            ], GroupsComponent);
            exports_1("GroupsComponent", GroupsComponent);
        }
    };
});
//# sourceMappingURL=groups.component.js.map
