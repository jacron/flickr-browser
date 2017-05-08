/**
 * Created by orion on 13/03/2017.
 */

export enum sort_type { Int, Alphanum }
export enum sort_direction { Asc, Desc }

export function sortField(items: any[], field: string, direction: sort_direction, type: sort_type) {
    items.sort((a, b) => {
        let increment: number;
        let an = a[field];
        let bn = b[field];
        if (!an) {throw new Error("Field not exists: " + field); }

        increment = direction === sort_direction.Asc ? 1 : -1;
        if (type === sort_type.Int) {
            try {
                an = parseInt(a[field], 10);
                bn = parseInt(b[field], 10);
            } catch (e) {
                console.log("error in sortField, throwing exception");
                throw e;
            }
        } else if (type === sort_type.Alphanum) {
            if (!an.toLowerCase) {
                throw new Error("not alphanumeric value: " + an);
                // return;
            }
            an = an.toLowerCase();
            bn = bn.toLowerCase();
        }
        if (an > bn) {return increment; }
        if (an < bn) {return -increment; }
        return 0;
    });
    return items;
}

export function sortAlphaNumAsc(items) {
    items.sort((a, b) => {
        const an = a.toLowerCase();
        const bn = b.toLowerCase();

        if (an > bn) {return 1; }
        if (an < bn) {return -1; }
        return 0;
    });
    return items;
}

export function format2(n) {
    if (n < 10) {return "0" + n.toString(); }
    return n;
}

export function isoDateToString(d) {
    const month = format2(d.getMonth() + 1);
    const date = format2(d.getDate());
    return d.getFullYear() + "-" + month + "-" + date;
}

export function stringToIsoDate(s) {
    return new Date(s);
}

export function prettyNumber(n, thousandsSeperator) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeperator);
}

export function calcPagesFromTotal(total, perPage) {
    const pages: number = +total / perPage;
    let intPages: number = Math.floor(pages);
    const remainder: number = total - (intPages * perPage);
    if (remainder > 0) {
        intPages++;
    }
    return intPages;
}

export function cloneProperties(props, source, target) {
    for (const prop of props) {
        target[prop] = source[prop];
    }
}

export function dateFromUnixTimestamp(timestamp) {
    const d = new Date(timestamp * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const date = d.getDate();
    // let h = d.getHours();
    // let m = '0' + d.getMinutes();
    // let s = '0' + d.getSeconds();
    // return h + ':' + m.substr(-2) + ':' + s.substr(-2);
    return date + " " + month + " " + year;
}

