System.register(["@angular/core", "rxjs/Subject"], function (exports_1, context_1) {
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
    var core_1, Subject_1, PhotoListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }
        ],
        execute: function () {
            PhotoListComponent = (function () {
                function PhotoListComponent() {
                    this.onChanges = new Subject_1.Subject();
                    this.selectPhoto = new core_1.EventEmitter();
                    this.prevPage = new core_1.EventEmitter();
                    this.nextPage = new core_1.EventEmitter();
                }
                PhotoListComponent.prototype.ngOnInit = function () {
                    // this.onChanges.subscribe((data: SimpleChanges) => {
                    // console.log(this.photos);
                    // });
                };
                PhotoListComponent.prototype.ngOnChanges = function (changes) {
                    this.onChanges.next(changes);
                };
                PhotoListComponent.prototype.select = function (photo, index) {
                    this.selectPhoto.next({
                        photo: photo,
                        index: index,
                    });
                };
                PhotoListComponent.prototype.onScroll = function () {
                    console.log("scroll!!");
                    // this.nextPage.emit();
                };
                return PhotoListComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], PhotoListComponent.prototype, "photos", void 0);
            PhotoListComponent = __decorate([
                core_1.Component({
                    selector: "photo-list",
                    templateUrl: "../../partials/photo-list.html",
                    styleUrls: ["../../css/photo-list.css"],
                    inputs: ["my", "waiting", "offset"],
                    outputs: ["selectPhoto"],
                })
            ], PhotoListComponent);
            exports_1("PhotoListComponent", PhotoListComponent);
        }
    };
});
//# sourceMappingURL=component.photo-list.js.map