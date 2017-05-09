/**
 * Created by orion on 21/03/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
@Component({
    templateUrl: "../../partials/buddies.html",
    styleUrls: ["../../css/buddies.css"],
    selector: "buddies",
})
export class BuddiesComponent implements OnInit {
    @Input() public items;
    @Input() public isList;
    @Input() public query;

    public listClass = "";
    public hasIcon = false;

    public ngOnInit() {
        if (this.isList) {
            this.listClass = "list";
        } else {
            this.hasIcon = true;
        }
    }
}
