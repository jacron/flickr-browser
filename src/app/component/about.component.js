System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, AboutComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AboutComponent = (function () {
                function AboutComponent() {
                    this.linksDictionary = {
                        "API": [
                            {
                                url: "https://www.flickr.com/services/api/",
                                name: "API doc",
                            },
                            {
                                url: "https://www.flickr.com/services/api/tos/",
                                name: "API tos",
                            },
                        ],
                        "STRATEGY": [
                            {
                                url: "https://www.flickr.com/people/nijlgier/contacts/rev/",
                                name: "my followers",
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
                        ],
                        "OTHER BROWSERS": [
                            {
                                url: "http://flickriver.com/about/",
                                name: "flickriver",
                            },
                            {
                                url: "https://hiveminer.com/",
                                name: "flickrhivemind",
                            },
                        ],
                    };
                }
                AboutComponent.prototype.linksDictionaryKeys = function () {
                    return Object.keys(this.linksDictionary);
                };
                return AboutComponent;
            }());
            AboutComponent = __decorate([
                core_1.Component({
                    templateUrl: "../../partials/about.html",
                    styleUrls: ["../../css/browse.css"],
                })
            ], AboutComponent);
            exports_1("AboutComponent", AboutComponent);
        }
    };
});
//# sourceMappingURL=about.component.js.map
