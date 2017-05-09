System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, InterestingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            InterestingComponent = (function () {
                /* tslint:disable:no-empty */
                function InterestingComponent() {
                    this.links = [
                        {
                            url: "https://www.flickr.com/services/api/",
                            name: "API doc",
                        },
                        {
                            url: "https://www.flickr.com/services/api/tos/",
                            name: "API tos",
                        },
                        {
                            url: "https://bighugelabs.com/scout.php",
                            name: "scout",
                        },
                        {
                            url: "https://bighugelabs.com/dna.php",
                            name: "dna",
                        },
                        {
                            url: "http://statsr.net/top-flickr/",
                            name: "statsr",
                        },
                        {
                            url: "https://www.flickr.com/photos/ironrodart/6144091654",
                            name: "how to get explored",
                        },
                    ];
                }
                return InterestingComponent;
            }());
            InterestingComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/interesting.html",
                    styleUrls: ["../../css/browse.css"],
                }),
                __metadata("design:paramtypes", [])
            ], InterestingComponent);
            exports_1("InterestingComponent", InterestingComponent);
        }
    };
});
//# sourceMappingURL=interesting.component.js.map
