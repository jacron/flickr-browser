/**
 * Created by orion on 18/03/2017.
 */

import {Component, OnInit, OnDestroy, HostListener} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicePhotos} from "../service/service.photos";
@Component({
    templateUrl: "../../partials/groupslist.html",
    styleUrls: ["../../css/browse.css", "../../css/favererslist.css", "../../css/closer.css"],
})
export class GroupsListComponent implements OnInit, OnDestroy {
    public sub;
    public nsid;
    public waiting = false;
    public my = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public servicePhotos: ServicePhotos,
    ) {}

    public ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe((params) => {
            /* tslint:disable:no-string-literal */
            this.nsid = params["nsid"];
            this.getPhotos(this.nsid);
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    @HostListener("window:keydown", ["$event"])
    public onKey(e) {
        this.servicePhotos.onKey(e);
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize() {
        this.servicePhotos.justify();
    }

    public selectPhoto(data) {
        this.servicePhotos.select(data);
        document.getElementById("top").scrollIntoView();
    }
    public nextPhoto() {
        this.servicePhotos.nextPhoto();

    }
    public prevPhoto() {
        this.servicePhotos.prevPhoto();
    }

    public closeDetails() {
        this.servicePhotos.clearPhoto();
    }

    public close() {
        this.router.navigate(["/groups"]).then();
    }

    public getPhotos(id) {
        this.servicePhotos.initPhotos();
        this.servicePhotos.getGroupPhotos(id);
    }

}
