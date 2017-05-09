/**
 * Created by orion on 17/03/2017.
 */
import {Component, Input} from "@angular/core";
@Component({
    template: `
<div *ngIf="show"
    [ngClass]="type"
>{{ text }}</div>
`,
    selector: "message",
    styles: [`.alert{color:red;}`],
})
export class MessageComponent {
  @Input() public text;
  @Input() public type;
  @Input() public show;

}
