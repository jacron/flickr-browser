System.register(["@angular/core", "../service/service.photo-details", "../model/model.photo"], function (exports_1, context_1) {
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
    var core_1, service_photo_details_1, model_photo_1, PhotoDetailsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_photo_details_1_1) {
                service_photo_details_1 = service_photo_details_1_1;
            },
            function (model_photo_1_1) {
                model_photo_1 = model_photo_1_1;
            }
        ],
        execute: function () {
            PhotoDetailsComponent = (function () {
                function PhotoDetailsComponent(servicePhotoDetails) {
                    this.servicePhotoDetails = servicePhotoDetails;
                    this.altSrc = false;
                    this.closeDetails = new core_1.EventEmitter();
                }
                PhotoDetailsComponent.prototype.ngOnInit = function () {
                    this.servicePhotoDetails.addToDetails(this.photo);
                    // console.log(this.photo);
                };
                PhotoDetailsComponent.prototype.close = function () {
                    this.closeDetails.next();
                };
                return PhotoDetailsComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", model_photo_1.PhotoModel)
            ], PhotoDetailsComponent.prototype, "photo", void 0);
            PhotoDetailsComponent = __decorate([
                core_1.Component({
                    selector: "photo-details",
                    templateUrl: "./partials/photo-details.html",
                    styleUrls: ["./css/photo-details.css", "./css/link.css"],
                    outputs: ["closeDetails"],
                }),
                __metadata("design:paramtypes", [service_photo_details_1.ServicePhotoDetails])
            ], PhotoDetailsComponent);
            exports_1("PhotoDetailsComponent", PhotoDetailsComponent);
        }
    };
});
//# sourceMappingURL=component.photo-details.js.map