/**
 * Created by orion on 15/03/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {sort_direction, sort_type, sortField} from "../helpers/util";
import {Router} from "@angular/router";
import {ServiceStorage} from "../service/service.storage";

@Component({
    templateUrl: "../../partials/groups.html",
    styleUrls: ["../../css/browse.css", "../../css/faverers.css"],
})
export class GroupsComponent implements OnInit {

    public groups;
    public photos;
    public photo;
    public waiting: boolean = false;
    public my: boolean = true;

    constructor(
        private serviceStorage: ServiceStorage,
        private serviceSearch: ServiceSearch,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        if (!this.groups) {
            this.getGroups();
        }
    }

    private retrieveFromStorage() {
        this.groups = this.serviceStorage.getJSON("groups");
    }

    private persistToStorage() {
        this.serviceStorage.setJSON("groups", this.groups);
    }

    public getGroups() {
        this.waiting = true;
        this.serviceSearch.getPublicGroups().subscribe((groups) => {
            this.groups = groups;
            sortField(this.groups, "name", sort_direction.Asc, sort_type.Alphanum);
            this.persistToStorage();
            this.waiting = false;
        });
    }

    public navigateToList(nsid) {
        this.router.navigate(["/grouplist", nsid]).then();
    }

}
