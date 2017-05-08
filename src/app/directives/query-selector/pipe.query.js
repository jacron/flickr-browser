System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, QueryPipe;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            QueryPipe = (function () {
                function QueryPipe() {
                }
                QueryPipe.prototype.transform = function (items, field, value) {
                    if (!items) {
                        return [];
                    }
                    if (!value) {
                        return items;
                    }
                    var lowervalue = value.toLowerCase();
                    if (!field) {
                        return items.filter(function (item) {
                            return item.toLowerCase().indexOf(lowervalue) !== -1;
                        });
                    }
                    return items.filter(function (item) {
                        if (!item[field]) {
                            return false;
                        }
                        return item[field].toLowerCase().indexOf(lowervalue) !== -1;
                    });
                };
                return QueryPipe;
            }());
            QueryPipe = __decorate([
                core_1.Pipe({
                    name: "query",
                }),
                core_1.Injectable()
            ], QueryPipe);
            exports_1("QueryPipe", QueryPipe);
        }
    };
});
//# sourceMappingURL=pipe.query.js.map