import {Component, OnInit} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {URLSearchParams} from "@angular/http";
import {ServiceStorage} from "../service/service.storage";
/**
 * Created by orion on 08/03/2017.
 */

@Component({
    templateUrl: "../../partials/tags.html",
    styleUrls: [ "../../css/browse.css"],
})
export class TagsComponent implements OnInit {
    public tags: any[];
    public count: number;
    public period: string;
    public waiting: boolean = false;

    constructor(
        private serviceSearch: ServiceSearch,
        private serviceStorage: ServiceStorage,
    ) {}

    public ngOnInit() {
        this.retrieveFromStorage();
        this.fetch();
    }

    private retrieveFromStorage() {
        this.count = parseInt(this.serviceStorage.get("tagcount"), 10) || 15;
        this.period = this.serviceStorage.get("period") || "day";
    }

    private persistToStorage() {
        this.serviceStorage.set("tagcount", this.count.toString());
        this.serviceStorage.set("period", this.period);
    }

    public fetch() {
        this.persistToStorage();
        const searchParams = new URLSearchParams();
        searchParams.append("count", this.count.toString());
        searchParams.append("period", this.period);
        this.waiting = true;
        this.serviceSearch.getTags(searchParams).subscribe((tags) => {
            this.tags = tags;
            this.waiting = false;
        });
    }
}
