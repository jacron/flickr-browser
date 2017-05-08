System.register(["@angular/core", "../service/service.storage", "../service/service.search", "../model/model.person"], function (exports_1, context_1) {
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
    var core_1, service_storage_1, service_search_1, model_person_1, FollowingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_storage_1_1) {
                service_storage_1 = service_storage_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (model_person_1_1) {
                model_person_1 = model_person_1_1;
            }
        ],
        execute: function () {
            FollowingComponent = (function () {
                function FollowingComponent(serviceStorage, serviceSearch) {
                    this.serviceStorage = serviceStorage;
                    this.serviceSearch = serviceSearch;
                    this.waiting = false;
                    this.my = true;
                }
                FollowingComponent.prototype.ngOnInit = function () {
                    this.retrieveFromStorage();
                    if (this.persons) {
                        console.log("data fetched from storage");
                    }
                    else {
                        this.search();
                    }
                };
                FollowingComponent.prototype.retrieveFromStorage = function () {
                    var minCount = parseInt(this.serviceStorage.get("followers.minCount"), 10);
                    if (isNaN(minCount)) {
                        minCount = 1;
                    }
                    this.persons = this.serviceStorage.getJSON("followers.persons");
                };
                FollowingComponent.prototype.persistToStorage = function () {
                    this.serviceStorage.setJSON("followers.persons", this.persons);
                };
                FollowingComponent.prototype.search = function () {
                    var _this = this;
                    this.waiting = true;
                    this.serviceSearch.getMyPublicList().subscribe(function (contacts) {
                        _this.persons = contacts.map(function (item) {
                            item = model_person_1.PersonModel.buddyPackedPerson(item); // this.packedPerson(item);
                            return item;
                        });
                        _this.persistToStorage();
                        _this.waiting = false;
                    });
                };
                return FollowingComponent;
            }());
            FollowingComponent = __decorate([
                core_1.Component({
                    templateUrl: "../partials/following.html",
                    styleUrls: ["../css/followers.css"],
                }),
                __metadata("design:paramtypes", [service_storage_1.ServiceStorage,
                    service_search_1.ServiceSearch])
            ], FollowingComponent);
            exports_1("FollowingComponent", FollowingComponent);
        }
    };
});
//# sourceMappingURL=component.following.js.map