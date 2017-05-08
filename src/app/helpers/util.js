/**
 * Created by orion on 13/03/2017.
 */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function sortField(items, field, direction, type) {
        items.sort(function (a, b) {
            var increment;
            var an = a[field];
            var bn = b[field];
            if (!an) {
                throw new Error("Field not exists: " + field);
            }
            increment = direction === sort_direction.Asc ? 1 : -1;
            if (type === sort_type.Int) {
                try {
                    an = parseInt(a[field], 10);
                    bn = parseInt(b[field], 10);
                }
                catch (e) {
                    console.log("error in sortField, throwing exception");
                    throw e;
                }
            }
            else if (type === sort_type.Alphanum) {
                if (!an.toLowerCase) {
                    throw new Error("not alphanumeric value: " + an);
                    // return;
                }
                an = an.toLowerCase();
                bn = bn.toLowerCase();
            }
            if (an > bn) {
                return increment;
            }
            if (an < bn) {
                return -increment;
            }
            return 0;
        });
        return items;
    }
    exports_1("sortField", sortField);
    function sortAlphaNumAsc(items) {
        items.sort(function (a, b) {
            var an = a.toLowerCase();
            var bn = b.toLowerCase();
            if (an > bn) {
                return 1;
            }
            if (an < bn) {
                return -1;
            }
            return 0;
        });
        return items;
    }
    exports_1("sortAlphaNumAsc", sortAlphaNumAsc);
    function format2(n) {
        if (n < 10) {
            return "0" + n.toString();
        }
        return n;
    }
    exports_1("format2", format2);
    function isoDateToString(d) {
        var month = format2(d.getMonth() + 1);
        var date = format2(d.getDate());
        return d.getFullYear() + "-" + month + "-" + date;
    }
    exports_1("isoDateToString", isoDateToString);
    function stringToIsoDate(s) {
        return new Date(s);
    }
    exports_1("stringToIsoDate", stringToIsoDate);
    function prettyNumber(n, thousandsSeperator) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeperator);
    }
    exports_1("prettyNumber", prettyNumber);
    function calcPagesFromTotal(total, perPage) {
        var pages = +total / perPage;
        var intPages = Math.floor(pages);
        var remainder = total - (intPages * perPage);
        if (remainder > 0) {
            intPages++;
        }
        return intPages;
    }
    exports_1("calcPagesFromTotal", calcPagesFromTotal);
    function cloneProperties(props, source, target) {
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            target[prop] = source[prop];
        }
    }
    exports_1("cloneProperties", cloneProperties);
    function dateFromUnixTimestamp(timestamp) {
        var d = new Date(timestamp * 1000);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = d.getFullYear();
        var month = months[d.getMonth()];
        var date = d.getDate();
        // let h = d.getHours();
        // let m = '0' + d.getMinutes();
        // let s = '0' + d.getSeconds();
        // return h + ':' + m.substr(-2) + ':' + s.substr(-2);
        return date + " " + month + " " + year;
    }
    exports_1("dateFromUnixTimestamp", dateFromUnixTimestamp);
    var sort_type, sort_direction;
    return {
        setters: [],
        execute: function () {/**
             * Created by orion on 13/03/2017.
             */
            (function (sort_type) {
                sort_type[sort_type["Int"] = 0] = "Int";
                sort_type[sort_type["Alphanum"] = 1] = "Alphanum";
            })(sort_type || (sort_type = {}));
            exports_1("sort_type", sort_type);
            (function (sort_direction) {
                sort_direction[sort_direction["Asc"] = 0] = "Asc";
                sort_direction[sort_direction["Desc"] = 1] = "Desc";
            })(sort_direction || (sort_direction = {}));
            exports_1("sort_direction", sort_direction);
        }
    };
});
//# sourceMappingURL=util.js.map