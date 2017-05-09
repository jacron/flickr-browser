/**
 * Created by orion on 27/02/2017.
 */
import {Component, EventEmitter, OnInit, Input, Output} from "@angular/core";
import {ServicePhotoDetails} from "../service/service.photo-details";
import {PhotoModel} from "../model/model.photo";

@Component({
  selector: "photo-details",
  templateUrl: "../../partials/photo-details.html",
  styleUrls: ["../../css/photo-details.css", "../../css/link.css"],
})

export class PhotoDetailsComponent implements OnInit {
  @Input() public photo: PhotoModel;
  @Output() public closeDetails: EventEmitter<any> = new EventEmitter();
  public expand;
  public altSrc = false;

  constructor(private servicePhotoDetails: ServicePhotoDetails,) {
  }


  public ngOnInit() {
    this.servicePhotoDetails.addToDetails(this.photo);
  }

  public close() {
    this.closeDetails.next();
  }
}
