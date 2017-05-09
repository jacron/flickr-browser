/**
 * Created by orion on 27/02/2017.
 */
import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "photo-list",
  templateUrl: "../../partials/photo-list.html",
  styleUrls: ["../../css/photo-list.css"],
})

export class PhotoListComponent implements OnInit, OnChanges {
  public onChanges = new Subject<SimpleChanges>();
  public prevPage: EventEmitter<any> = new EventEmitter();
  public nextPage: EventEmitter<any> = new EventEmitter();

  @Input() public photos;
  @Input() public my;
  @Input() public waiting;
  @Input() public offset;
  @Output() public selectPhoto = new EventEmitter();
  @Output() public nextScrollPage = new EventEmitter();

  public ngOnInit() {
    // this.onChanges.subscribe((data: SimpleChanges) => {
    // console.log(this.photos);
    // });
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }

  public select(photo, index) {
    this.selectPhoto.next({
      photo,
      index,
    });
  }

  public onScrolled() {
    console.log("scroll!!");
    this.nextScrollPage.emit();
  }

}
