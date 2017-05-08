System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Created by orion on 15/03/2017.
     */
    function getExif(exif, camera) {
        function itemContent(item) {
            return item.clean ? item.clean._content : item.raw._content;
        }
        var labels = [
            "Image Description",
            "Software",
            "Artist",
            "Exposure Program",
            "Exposure Bias",
            "Max Apertue Value",
            "Metering Mode",
            "Flash",
            "Approximate Focus Distance",
            "Subject Distance",
            "Subject Distance Range",
        ];
        var cameras = {
            "Canon EOS 5D Mark III": {
                file: "canon5diii.jpg",
                pretty_name: "Canon EOS 5D Mark III",
            },
            "Casio QV-5700": {
                file: "CASIO_QV5700.jpg",
                pretty_name: "Casio QV-5700",
            },
            "Apple iPhone 5": {
                file: "APPLE-iPhone-5s.png",
                pretty_name: "Apple iPhone 5",
            },
            "Ricoh IMAGING COMPANY, LTD. Pentax K-3": {
                file: "PentaxK3.png",
                pretty_name: "Pentax K3",
            },
            "Pentax K10D": {
                file: "PentaxK10D.jpg",
                pretty_name: "Pentax K10D",
            },
            "Sony DSC-RX100M4": {
                file: "sony100rxiv.jpg",
                pretty_name: "Sony DSC-RX100 M4",
            },
        };
        var lensModel = null;
        var aperture = null;
        var exposure = null;
        var iso = null;
        var focalLength = null;
        var details = [];
        exif.map(function (item) {
            if (item.label === "Lens Model") {
                lensModel = itemContent(item);
            }
            if (item.label === "Aperture") {
                aperture = itemContent(item);
            }
            if (item.label === "Exposure") {
                exposure = itemContent(item);
            }
            if (item.label === "ISO Speed") {
                iso = itemContent(item);
            }
            if (item.label === "Focal Length") {
                focalLength = itemContent(item);
            }
            if (labels.indexOf(item.label) !== -1) {
                var value = itemContent(item);
                details.push(item.label + ": " + value);
            }
        });
        var cameraName = "";
        var cameraFile = "";
        if (cameras[camera]) {
            cameraName = cameras[camera].pretty_name;
            cameraFile = cameras[camera].file;
        }
        else {
            // console.log(camera + " is not known here");
            cameraName = camera;
        }
        return {
            camera: cameraName,
            cameraImage: cameraFile,
            lensModel: lensModel,
            aperture: aperture,
            exposure: exposure,
            iso: iso,
            focalLength: focalLength,
            otherdetails: details,
        };
    }
    exports_1("getExif", getExif);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=exif.js.map