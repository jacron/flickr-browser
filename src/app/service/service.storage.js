/**
 * Created by orion on 27/02/2017.
 */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ServiceStorage;
    return {
        setters: [],
        execute: function () {/**
             * Created by orion on 27/02/2017.
             */
            ServiceStorage = (function () {
                function ServiceStorage() {
                }
                ServiceStorage.prototype.get = function (key) {
                    return window.localStorage.getItem(key);
                };
                ServiceStorage.prototype.set = function (key, value) {
                    window.localStorage.setItem(key, value);
                };
                ServiceStorage.prototype.setJSON = function (key, value) {
                    this.set(key, JSON.stringify(value));
                };
                ServiceStorage.prototype.getJSON = function (key) {
                    var value = this.get(key);
                    if (!value) {
                        return value;
                    }
                    try {
                        return JSON.parse(value);
                    }
                    catch (e) {
                        console.log(e);
                        console.log(value);
                    }
                    return null;
                };
                return ServiceStorage;
            }());
            exports_1("ServiceStorage", ServiceStorage);
        }
    };
});
//# sourceMappingURL=service.storage.js.map