System.register(["@angular/core", "../service/service.search", "../helpers/util", "../model/model.person"], function (exports_1, context_1) {
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
    var core_1, service_search_1, util_1, model_person_1, BuddyComponent;
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
            function (model_person_1_1) {
                model_person_1 = model_person_1_1;
            }
        ],
        execute: function () {
            BuddyComponent = (function () {
                function BuddyComponent(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                    this.descriptionCollapsed = true;
                }
                BuddyComponent.prototype.ngOnInit = function () {
                    this.initPerson();
                };
                BuddyComponent.prototype.initPerson = function () {
                    var _this = this;
                    if (this.type === "person") {
                        this.serviceSearch.peopleGetInfo(this.nsid).subscribe(function (response) {
                            _this.person = model_person_1.PersonModel.buddyPackedPersonExtra(response);
                            if (!_this.short) {
                                _this.serviceSearch.getProfile(_this.nsid).subscribe(function (profile) {
                                    _this.person.profileDescription = profile.profile_description;
                                    util_1.cloneProperties([
                                        "website", "occupation", "hometown", "city", "country",
                                    ], profile, _this.person);
                                    _this.serviceSearch.getUserFavoritesCount(_this.nsid).subscribe(function (count) {
                                        _this.person.favoritesCount = util_1.prettyNumber(count, ".");
                                    });
                                });
                            }
                        });
                    }
                    if (this.type === "group") {
                        this.serviceSearch.groupGetInfo(this.nsid).subscribe(function (group) {
                            _this.person = model_person_1.PersonModel.buddyPackedGroup(group);
                        });
                    }
                };
                return BuddyComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddyComponent.prototype, "nsid", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddyComponent.prototype, "type", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddyComponent.prototype, "short", void 0);
            BuddyComponent = __decorate([
                core_1.Component({
                    templateUrl: "../partials/buddy.html",
                    selector: "buddy",
                    styleUrls: ["../css/favererslist.css", "./css/buddy.css"],
                }),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], BuddyComponent);
            exports_1("BuddyComponent", BuddyComponent);
        }
    };
});
//# sourceMappingURL=component.buddy.js.map