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
    var core_1, PageNavigationComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            PageNavigationComponent = (function () {
                function PageNavigationComponent() {
                    this.prev = new core_1.EventEmitter();
                    this.next = new core_1.EventEmitter();
                }
                PageNavigationComponent.prototype.prevPage = function () {
                    this.prev.next();
                };
                PageNavigationComponent.prototype.nextPage = function () {
                    this.next.next();
                };
                return PageNavigationComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], PageNavigationComponent.prototype, "page", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], PageNavigationComponent.prototype, "pages", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], PageNavigationComponent.prototype, "prev", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], PageNavigationComponent.prototype, "next", void 0);
            PageNavigationComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/page-navigation.html",
                    selector: "page-navigation",
                    styleUrls: ["./css/page-navigation.css"],
                })
            ], PageNavigationComponent);
            exports_1("PageNavigationComponent", PageNavigationComponent);
        }
    };
});
//# sourceMappingURL=component.page-navigation.js.map