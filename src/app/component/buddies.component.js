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
    var core_1, BuddiesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            BuddiesComponent = (function () {
                function BuddiesComponent() {
                    this.listClass = "";
                    this.hasIcon = false;
                }
                BuddiesComponent.prototype.ngOnInit = function () {
                    if (this.isList) {
                        this.listClass = "list";
                    }
                    else {
                        this.hasIcon = true;
                    }
                };
                return BuddiesComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddiesComponent.prototype, "items", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddiesComponent.prototype, "isList", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], BuddiesComponent.prototype, "query", void 0);
            BuddiesComponent = __decorate([
                core_1.Component({
                    templateUrl: "./partials/buddies.html",
                    styleUrls: ["./css/buddies.css"],
                    selector: "buddies",
                })
            ], BuddiesComponent);
            exports_1("BuddiesComponent", BuddiesComponent);
        }
    };
});
//# sourceMappingURL=buddies.component.js.map
