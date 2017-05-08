import {Injectable} from "@angular/core";

/**
 * Created by orion on 15/03/2017.
 */

@Injectable()
export class ServiceJustify {
    private photos;
    public border;
    public index;
    public column;
    public pageWidth;
    public initialHeight;

    private getAllWidths() {
        const ws = [];
        for (const photo of this.photos) {
            const ww = photo.width_n || photo.width_m;
            const hh = photo.height_n || photo.height_m;
            let wt = parseInt(ww, 10);
            const ht = parseInt(hh, 10);
            if (ht !== this.initialHeight) {
                wt = Math.floor(wt * (this.initialHeight / ht));
            }
            ws.push(wt);
        }
        return ws;
    }

    private getRatio(ws) {
        let tw = 0;
        while (tw * 1.1 < this.pageWidth && this.column < ws.length) {
            tw += ws[this.column++] + this.border * 2;
        }

        // Ratio of actual width of row to total width of images to be used.
        return this.pageWidth / tw;
    }

    private setDimensions() {
        // console.log(this.column - this.index);
        if (this.column - this.index === 1) {
            this.index++;
            console.log("skipped the lonesome photo");
            return;
        }   // laatste rij eentje

        const widthArray = this.getAllWidths();
        const ratio = this.getRatio(widthArray);
        // console.log(ratio, this.initialHeight * ratio);
        const ht = Math.floor(this.initialHeight * ratio);
        let totalWidth = 0;
        const intented = [];
        while (this.index < this.column) {
            const photo = this.photos[this.index];
            if (!photo) {
                console.log("index out of range: ", this.index);
                break;
            }

            // Calculate new width based on ratio
            const wt = Math.floor(widthArray[this.index] * ratio);

            // add to total width with margins
            totalWidth += wt + this.border * 2;

            // Create image, set src, width, height and margin
            intented.push({
                index: this.index,
                width: wt,
                height: ht,
            });
            this.index++;
        }
        const r2 = this.pageWidth / totalWidth;
        // console.log(this.pageWidth, totalWidth, totalWidth * r2);
        if (this.pageWidth - totalWidth < 10) {
            for (const i of intented) {
                this.photos[i.index].width = Math.floor(r2 * i.width);
                this.photos[i.index].height = i.height;
            }
        } else {
            for (const i of intented) {
                this.photos[i.index].height = this.initialHeight;
                this.photos[i.index].width = null;
            }
        }
    }

    private initialize(photos) {
        this.photos = photos;
        this.index = 0;
        this.column = 0;
        this.pageWidth = document.getElementById("top").clientWidth - 300;
        this.initialHeight = 320;
        this.border = 5;
    }

    public processPhotos(photos) {
        if (!photos) {
            return;
        }
        if (photos.length === 1) {
            if (photos[0].width_m) {
                // console.log(photos[0]);
                photos[0].width = photos[0].width_m;
                photos[0].height = photos[0].height_m;
            }
            return;
        }
        this.initialize(photos);
        let safetyIndex = this.photos.length;
        do {
            this.setDimensions();
        } while (this.index < this.photos.length && safetyIndex-- >= 0);
    }

}
