/**
 * Created by orion on 17/03/2017.
 */
import {Component} from "@angular/core";
@Component({
    template: `
<div *ngIf="show"
    [ngClass]="type"
>{{ text }}</div>
`,
    selector: "message",
    inputs: ["text", "type", "show"],
    styles: [`.alert{color:red;}`],
})
export class MessageComponent {

}
