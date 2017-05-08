/**
 * Created by orion on 24/03/2017.
 */
import {Component} from "@angular/core";
import {ServiceStorage} from "../service/service.storage";
import {ServiceSearch} from "../service/service.search";
import {PersonModel} from "../model/model.person";
@Component({
    templateUrl: "../../partials/following.html",
    styleUrls: ["../../css/followers.css"],
})
export class FollowingComponent {
    constructor(
        private serviceStorage: ServiceStorage,
        private serviceSearch: ServiceSearch,
    ) {}

    public persons;
    public waiting: boolean = false;
    public my: boolean = true;
    public person: any;

    public ngOnInit() {
        this.retrieveFromStorage();
        if (this.persons) {
            console.log("data fetched from storage");
        } else {
            this.search();
        }
    }

    private retrieveFromStorage() {
        let minCount = parseInt(this.serviceStorage.get("followers.minCount"), 10);
        if (isNaN(minCount)) {
            minCount = 1;
        }
        this.persons = this.serviceStorage.getJSON("followers.persons");
    }

    private persistToStorage() {
        this.serviceStorage.setJSON("followers.persons", this.persons);
    }

    public search() {
        this.waiting = true;
        this.serviceSearch.getMyPublicList().subscribe((contacts) => {
            this.persons = contacts.map((item) => {
                item = PersonModel.buddyPackedPerson(item);  // this.packedPerson(item);
                return item;
            });
            this.persistToStorage();
            this.waiting = false;
        });
    }

}
