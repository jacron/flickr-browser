/**
 * Created by orion on 29/03/2017.
 *
 * two-way binding query attribute
 * queryChange is implicit, thanks to the [()] notation
 *
 * example:
 * <app-query-text [(query)]="query"></app-query-text>
 * <li *ngFor="let link of avxItemsService.links | query:'title': query; let i = index"
 *
 * dependency: QueryPipe
 *
 * for the future: make this a npm package
 */
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
    var core_1, QueryTextComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {/**
             * Created by orion on 29/03/2017.
             *
             * two-way binding query attribute
             * queryChange is implicit, thanks to the [()] notation
             *
             * example:
             * <app-query-text [(query)]="query"></app-query-text>
             * <li *ngFor="let link of avxItemsService.links | query:'title': query; let i = index"
             *
             * dependency: QueryPipe
             *
             * for the future: make this a npm package
             */
            QueryTextComponent = (function () {
                function QueryTextComponent() {
                    this.queryChange = new core_1.EventEmitter();
                }
                QueryTextComponent.prototype.ngOnInit = function () {
                    this.query = "";
                };
                QueryTextComponent.prototype.qChange = function (e) {
                    var v = e.target.value;
                    this.queryChange.emit(v);
                };
                QueryTextComponent.prototype.resetQ = function (focusable) {
                    this.query = "";
                    this.queryChange.emit("");
                    focusable.focus();
                };
                QueryTextComponent.prototype.onKeyup = function (e, focusable) {
                    if (e.keyCode === 27) {
                        this.resetQ(focusable);
                    }
                };
                return QueryTextComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], QueryTextComponent.prototype, "query", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", Object)
            ], QueryTextComponent.prototype, "queryChange", void 0);
            QueryTextComponent = __decorate([
                core_1.Component({
                    template: "\n        <div class=\"search\">\n            <span class=\"fa fa-search\"></span>\n            <input [value]=\"query\"\n                   name=\"query\"\n                   placeholder=\"Filter\"\n                   autocomplete=\"off\"\n                   #focusable\n                   (keyup)=\"onKeyup($event, focusable)\"\n                   (input)=\"qChange($event)\">\n            <span class=\"closer fa fa-times-circle\"\n                  *ngIf=\"query.length\"\n                  (click)=\"resetQ(focusable)\"\n            ></span>\n        </div>\n    ",
                    selector: "query-text",
                    styles: ["\n        @import url(\"//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\");\n        .search {\n            position: relative;\n            display: inline-block;\n            margin-right: 8px;\n            width: 140px;\n        }\n        .search input {\n            width: 90px;\n            height: 24px;\n            padding: 0 25px 0 22px;\n        }\n        .search .fa-search {\n            position: absolute;\n            top: 8px;\n            left: 7px;\n            font-size: 12px;\n            opacity:.6;\n        }\n        .closer {\n            position: absolute;\n            right: 10px;\n            top: 7px;\n            opacity:.6;\n        }\n    "],
                })
            ], QueryTextComponent);
            exports_1("QueryTextComponent", QueryTextComponent);
        }
    };
});
//# sourceMappingURL=component.query-text.js.map