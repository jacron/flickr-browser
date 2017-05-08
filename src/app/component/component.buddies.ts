/**
 * Created by orion on 21/03/2017.
 */
import {Component, Input} from "@angular/core";
@Component({
    templateUrl: "../../partials/buddies.html",
    styleUrls: ["../../css/buddies.css"],
    selector: "buddies",
})
export class BuddiesComponent {
    @Input() public items;
    @Input() public isList;
    @Input() public query;

    public listClass: string = "";
    public hasIcon: boolean = false;

    public ngOnInit() {
        if (this.isList) {
            this.listClass = "list";
        } else {
            this.hasIcon = true;
        }
    }
}
