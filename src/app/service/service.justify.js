System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, ServiceJustify;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ServiceJustify = (function () {
                function ServiceJustify() {
                }
                ServiceJustify.prototype.getAllWidths = function () {
                    var ws = [];
                    for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
                        var photo = _a[_i];
                        var ww = photo.width_n || photo.width_m;
                        var hh = photo.height_n || photo.height_m;
                        var wt = parseInt(ww, 10);
                        var ht = parseInt(hh, 10);
                        if (ht !== this.initialHeight) {
                            wt = Math.floor(wt * (this.initialHeight / ht));
                        }
                        ws.push(wt);
                    }
                    return ws;
                };
                ServiceJustify.prototype.getRatio = function (ws) {
                    var tw = 0;
                    while (tw * 1.1 < this.pageWidth && this.column < ws.length) {
                        tw += ws[this.column++] + this.border * 2;
                    }
                    // Ratio of actual width of row to total width of images to be used.
                    return this.pageWidth / tw;
                };
                ServiceJustify.prototype.setDimensions = function () {
                    // console.log(this.column - this.index);
                    if (this.column - this.index === 1) {
                        this.index++;
                        console.log("skipped the lonesome photo");
                        return;
                    } // laatste rij eentje
                    var widthArray = this.getAllWidths();
                    var ratio = this.getRatio(widthArray);
                    // console.log(ratio, this.initialHeight * ratio);
                    var ht = Math.floor(this.initialHeight * ratio);
                    var totalWidth = 0;
                    var intented = [];
                    while (this.index < this.column) {
                        var photo = this.photos[this.index];
                        if (!photo) {
                            console.log("index out of range: ", this.index);
                            break;
                        }
                        // Calculate new width based on ratio
                        var wt = Math.floor(widthArray[this.index] * ratio);
                        // add to total width with margins
                        totalWidth += wt + this.border * 2;
                        // Create image, set src, width, height and margin
                        intented.push({
                            index: this.index,
                            width: wt,
                            height: ht,
                        });
                        this.index++;
                    }
                    var r2 = this.pageWidth / totalWidth;
                    // console.log(this.pageWidth, totalWidth, totalWidth * r2);
                    if (this.pageWidth - totalWidth < 10) {
                        for (var _i = 0, intented_1 = intented; _i < intented_1.length; _i++) {
                            var i = intented_1[_i];
                            this.photos[i.index].width = Math.floor(r2 * i.width);
                            this.photos[i.index].height = i.height;
                        }
                    }
                    else {
                        for (var _a = 0, intented_2 = intented; _a < intented_2.length; _a++) {
                            var i = intented_2[_a];
                            this.photos[i.index].height = this.initialHeight;
                            this.photos[i.index].width = null;
                        }
                    }
                };
                ServiceJustify.prototype.initialize = function (photos) {
                    this.photos = photos;
                    this.index = 0;
                    this.column = 0;
                    this.pageWidth = document.getElementById("top").clientWidth - 300;
                    this.initialHeight = 320;
                    this.border = 5;
                };
                ServiceJustify.prototype.processPhotos = function (photos) {
                    if (!photos) {
                        return;
                    }
                    if (photos.length === 1) {
                        if (photos[0].width_m) {
                            // console.log(photos[0]);
                            photos[0].width = photos[0].width_m;
                            photos[0].height = photos[0].height_m;
                        }
                        return;
                    }
                    this.initialize(photos);
                    var safetyIndex = this.photos.length;
                    do {
                        this.setDimensions();
                    } while (this.index < this.photos.length && safetyIndex-- >= 0);
                };
                return ServiceJustify;
            }());
            ServiceJustify = __decorate([
                core_1.Injectable()
            ], ServiceJustify);
            exports_1("ServiceJustify", ServiceJustify);
        }
    };
});
//# sourceMappingURL=service.justify.js.map