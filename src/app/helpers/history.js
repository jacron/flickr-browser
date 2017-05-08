System.register(["./util"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var util_1, History;
    return {
        setters: [
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            /**
             * Created by orion on 14/03/2017.
             */
            History = (function () {
                function History() {
                }
                History.prototype.sort = function () {
                    util_1.sortField(this.items, "text", util_1.sort_direction.Asc, util_1.sort_type.Alphanum);
                };
                History.prototype.insertItem = function (text) {
                    text = text.toLowerCase();
                    var found = false;
                    if (!this.items) {
                        this.items = [];
                    }
                    else {
                        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.text === text) {
                                item.count++;
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        this.items.push({
                            text: text,
                            count: 1,
                        });
                        this.sort();
                    }
                };
                History.prototype.remove = function (item) {
                    var index = this.items.indexOf(item);
                    if (index === -1) {
                        console.log("not found", item);
                        return;
                    }
                    this.items.splice(index, 1);
                };
                History.prototype.clear = function () {
                    this.items = null;
                };
                History.prototype.getItems = function () {
                    return this.items;
                };
                History.prototype.setItems = function (items) {
                    this.items = items;
                };
                return History;
            }());
            exports_1("History", History);
        }
    };
});
//# sourceMappingURL=history.js.map