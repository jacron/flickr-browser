/**
 * Created by orion on 27/02/2017.
 */
import {Component, EventEmitter, OnInit, Input} from "@angular/core";
import {ServicePhotoDetails} from "../service/service.photo-details";
import {PhotoModel} from "../model/model.photo";

@Component({
    selector: "photo-details",
    templateUrl: "../../partials/photo-details.html",
    styleUrls: ["../../css/photo-details.css", "../../css/link.css"],
    outputs: ["closeDetails"],
})

export class PhotoDetailsComponent implements OnInit {
    constructor(
        private servicePhotoDetails: ServicePhotoDetails,
    ) {}

    @Input()
    public photo: PhotoModel;

    public altSrc: boolean = false;

    public ngOnInit() {
        this.servicePhotoDetails.addToDetails(this.photo);
        // console.log(this.photo);
    }

    public closeDetails: EventEmitter<any> = new EventEmitter();

    public close() {
        this.closeDetails.next();
    }
}
