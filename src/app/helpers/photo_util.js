/**
 * Created by orion on 11/04/2017.
 */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function fave_item(favedate, itemId) {
        return {
            id: itemId,
            favedate: favedate,
        };
    }
    exports_1("fave_item", fave_item);
    function medium_of_sizes(sizes) {
        var width = 0;
        var height = 0;
        for (var _i = 0, sizes_1 = sizes; _i < sizes_1.length; _i++) {
            var size = sizes_1[_i];
            if (size.label === "Medium") {
                width = size.width;
                height = size.height;
            }
        }
        return {
            width: width,
            height: height,
        };
    }
    exports_1("medium_of_sizes", medium_of_sizes);
    return {
        setters: [],
        execute: function () {/**
             * Created by orion on 11/04/2017.
             */
        }
    };
});
//# sourceMappingURL=photo_util.js.map