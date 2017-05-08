/**
 * Created by orion on 29/03/2017.
 */
import {Injectable, Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "query",
})
@Injectable()
export class QueryPipe implements PipeTransform {
    public transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        const lowervalue = value.toLowerCase();
        if (!field) {
            return items.filter((item) => {
                return item.toLowerCase().indexOf(lowervalue) !== -1;
            });
        }
        return items.filter((item) => {
            if (!item[field]) {
                return false;
            }
            return item[field].toLowerCase().indexOf(lowervalue) !== -1;
        });
    }
}
