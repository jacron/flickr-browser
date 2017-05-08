/**
 * Created by orion on 29/03/2017.
 *
 * two-way binding query attribute
 * queryChange is implicit, thanks to the [()] notation
 *
 * example:
 * <app-query-text [(query)]="query"></app-query-text>
 * <li *ngFor="let link of avxItemsService.links | query:'title': query; let i = index"
 *
 * dependency: QueryPipe
 *
 * for the future: make this a npm package
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    template: `
        <div class="search">
            <span class="fa fa-search"></span>
            <input [value]="query"
                   name="query"
                   placeholder="Filter"
                   autocomplete="off"
                   #focusable
                   (keyup)="onKeyup($event, focusable)"
                   (input)="qChange($event)">
            <span class="closer fa fa-times-circle"
                  *ngIf="query.length"
                  (click)="resetQ(focusable)"
            ></span>
        </div>
    `,
    selector: "query-text",
    styles: [`
        @import url("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
        .search {
            position: relative;
            display: inline-block;
            margin-right: 8px;
            width: 140px;
        }
        .search input {
            width: 90px;
            height: 24px;
            padding: 0 25px 0 22px;
        }
        .search .fa-search {
            position: absolute;
            top: 8px;
            left: 7px;
            font-size: 12px;
            opacity:.6;
        }
        .closer {
            position: absolute;
            right: 10px;
            top: 7px;
            opacity:.6;
        }
    `],
})
export class QueryTextComponent {
    @Input()
    public query: string;

    @Output()
    public queryChange = new EventEmitter<string>();

    public ngOnInit() {
        this.query = "";
    }

    public qChange(e) {
        const v = e.target.value;
        this.queryChange.emit(v);
    }

    public resetQ(focusable) {
        this.query = "";
        this.queryChange.emit("");
        focusable.focus();
    }

    public onKeyup(e, focusable) {
        if (e.keyCode === 27) {
            this.resetQ(focusable);
        }
    }
}
