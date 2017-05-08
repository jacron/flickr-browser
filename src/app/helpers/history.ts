import {sort_direction, sort_type, sortField} from "./util";

/**
 * Created by orion on 14/03/2017.
 */

export class History {
    private items;

    private sort() {
        sortField(this.items, "text", sort_direction.Asc, sort_type.Alphanum);
    }

    public insertItem(text: string) {
        text = text.toLowerCase();
        let found = false;
        if (!this.items) {
            this.items = [];
        } else {
            for (const item of this.items) {
                if (item.text === text) {
                    item.count++;
                    found = true;
                }
            }
        }
        if (!found) {
            this.items.push({
                text,
                count: 1,
            });
            this.sort();
        }
    }

    public remove(item) {
        const index = this.items.indexOf(item);
        if (index === -1) {
            console.log("not found", item);
            return;
        }
        this.items.splice(index, 1);
    }

    public clear() {
        this.items = null;
    }

    public getItems() {
        return this.items;
    }

    public setItems(items) {
        this.items = items;
    }

}
