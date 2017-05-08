/**
 * Created by orion on 11/04/2017.
 */

export function fave_item(favedate, itemId) {
    return {
        id: itemId,
        favedate,
    };
}

export function medium_of_sizes(sizes) {
    let width = 0;
    let height = 0;
    for (const size of sizes) {
        if (size.label === "Medium") {
            width = size.width;
            height = size.height;
        }
    }
    return {
        width,
        height,
    };
}
