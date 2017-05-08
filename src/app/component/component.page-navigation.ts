/**
 * Created by orion on 29/03/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
@Component({
    templateUrl: "../../partials/page-navigation.html",
    selector: "page-navigation",
    styleUrls: ["../../css/page-navigation.css"],
})
export class PageNavigationComponent {
    @Input()
    public page;

    @Input()
    public pages;

    @Output()
    public prev: EventEmitter<any> = new EventEmitter();

    @Output()
    public next: EventEmitter<any> = new EventEmitter();

    public prevPage() {
        this.prev.next();
    }

    public nextPage() {
        this.next.next();
    }

}
