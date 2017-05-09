/**
 * Created by orion on 21/03/2017.
 */
import {Component, Input} from "@angular/core";
@Component({
    templateUrl: "../../partials/exif.html",
    styleUrls: ["../../css/exif.css"],
    selector: "exif",
})
export class ExifComponent {
    @Input()
    public exif;
    public detailsExpanded = false;

    public toggleDetailsExpanded() {
        this.detailsExpanded = !this.detailsExpanded;
    }
}
