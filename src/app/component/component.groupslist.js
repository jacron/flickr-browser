/**
 * Created by orion on 18/03/2017.
 */
System.register(["@angular/core", "@angular/router", "../service/service.photos"], function (exports_1, context_1) {
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
    var core_1, router_1, service_photos_1, GroupsListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_photos_1_1) {
                service_photos_1 = service_photos_1_1;
            }
        ],
        execute: function () {/**
             * Created by orion on 18/03/2017.
             */
            GroupsListComponent = (function () {
                function GroupsListComponent(router, activatedRoute, servicePhotos) {
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.servicePhotos = servicePhotos;
                    this.waiting = false;
                    this.my = true;
                }
                GroupsListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.activatedRoute.params.subscribe(function (params) {
                        /* tslint:disable:no-string-literal */
                        _this.nsid = params["nsid"];
                        _this.getPhotos(_this.nsid);
                    });
                };
                GroupsListComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                GroupsListComponent.prototype.onKey = function (e) {
                    this.servicePhotos.onKey(e);
                };
                GroupsListComponent.prototype.onResize = function () {
                    this.servicePhotos.justify();
                };
                GroupsListComponent.prototype.selectPhoto = function (data) {
                    this.servicePhotos.select(data);
                    document.getElementById("top").scrollIntoView();
                };
                GroupsListComponent.prototype.nextPhoto = function () {
                    this.servicePhotos.nextPhoto();
                };
                GroupsListComponent.prototype.prevPhoto = function () {
                    this.servicePhotos.prevPhoto();
                };
                GroupsListComponent.prototype.closeDetails = function () {
                    this.servicePhotos.clearPhoto();
                };
                GroupsListComponent.prototype.close = function () {
                    this.router.navigate(["/groups"]).then();
                };
                GroupsListComponent.prototype.getPhotos = function (id) {
                    this.servicePhotos.initPhotos();
                    this.servicePhotos.getGroupPhotos(id);
                };
                return GroupsListComponent;
            }());
            __decorate([
                core_1.HostListener("window:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], GroupsListComponent.prototype, "onKey", null);
            __decorate([
                core_1.HostListener("window:resize", ["$event.target"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], GroupsListComponent.prototype, "onResize", null);
            GroupsListComponent = __decorate([
                core_1.Component({
                    templateUrl: "../partials/groupslist.html",
                    styleUrls: ["../../css/browse.css", "../../css/favererslist.css", "./css/closer.css"],
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    router_1.ActivatedRoute,
                    service_photos_1.ServicePhotos])
            ], GroupsListComponent);
            exports_1("GroupsListComponent", GroupsListComponent);
        }
    };
});
//# sourceMappingURL=component.groupslist.js.map