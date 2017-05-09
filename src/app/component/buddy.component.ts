import {Component, OnInit, Input} from "@angular/core";
import {ServiceSearch} from "../service/service.search";
import {cloneProperties, prettyNumber} from "../helpers/util";
import {PersonModel} from "../model/model.person";

/**
 * Created by orion on 17/03/2017.
 * create a icon, title and link for a person or group
 *
 */

@Component({
    templateUrl: "../../partials/buddy.html",
    selector: "buddy",
    styleUrls: ["../../css/favererslist.css", "../../css/buddy.css"],
})
export class BuddyComponent implements OnInit {
    public person: PersonModel;
    @Input() public nsid;
    @Input() public type;
    @Input() public short;
    public descriptionCollapsed = true;

    constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    public ngOnInit() {
        this.initPerson();
    }

    private initPerson() {
        if (this.type === "person") {
            this.serviceSearch.peopleGetInfo(this.nsid).subscribe((response) => {
                this.person = PersonModel.buddyPackedPersonExtra(response);
                if (!this.short) {
                    this.serviceSearch.getProfile(this.nsid).subscribe((profile) => {
                        this.person.profileDescription = profile.profile_description;
                        cloneProperties([
                            "website", "occupation", "hometown", "city", "country",
                        ], profile, this.person);
                        this.serviceSearch.getUserFavoritesCount(this.nsid).subscribe((count) => {
                            this.person.favoritesCount = prettyNumber(count, ".");
                        });
                    });
                }
            });
        }
        if (this.type === "group") {
            this.serviceSearch.groupGetInfo(this.nsid).subscribe((group) => {
                this.person = PersonModel.buddyPackedGroup(group);
            });

        }
    }

}
