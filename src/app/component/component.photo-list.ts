/**
 * Created by orion on 27/02/2017.
 */
import {Component, EventEmitter, Input, SimpleChanges} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
    selector: "photo-list",
    templateUrl: "../../partials/photo-list.html",
    styleUrls: ["../../css/photo-list.css"],
    inputs: ["my", "waiting", "offset"],
    outputs: ["selectPhoto"],
})

export class PhotoListComponent {
    public onChanges = new Subject<SimpleChanges>();
    public selectPhoto: EventEmitter<any> = new EventEmitter();
    public prevPage: EventEmitter<any> = new EventEmitter();
    public nextPage: EventEmitter<any> = new EventEmitter();

    @Input()
    public photos;

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

    public onScroll() {
        console.log("scroll!!");
        // this.nextPage.emit();
    }

}
