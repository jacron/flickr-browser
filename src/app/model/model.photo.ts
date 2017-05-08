import {PhotoComment} from "./model.photo-comment";
// import {ServiceSearch} from "../service/service.search";
/**
 * Created by orion on 31/03/2017.
 */
export class PhotoModel {
    public id: string;
    // public datetaken;
    public favorites: any[];
    public favoritesLen: number;
    public taken;
    public posted;
    public description: {
        _content: string,
    };
    public comments: PhotoComment[];
    public owner: string;
    public tags: string;
    public group_ids: string[];
    public ownername: string;
    public url_l: string;
    public url_m: string;
    public exif;
    public xBuddyIconSrc: string;
    public xDescription: string;
    public xOriginalsrc: string;
    public xOwnerPage: string;
    public xSrc: string;
    public xAltSrc: string;
    public xDna: string;
    public xExif;
    public set: any[];
    public location: {
        latitude: string,
        longitude: string,
        accuracy: string,
        county: {
            _content: string,
        },
        country: {
            _content: string,
        },
        region: {
            _content: string,
        },
    };
    /*
    constructor(
        private serviceSearch: ServiceSearch,
    ) {}
    public addLocation() {
        this.serviceSearch.geoGetLocation(this.id).subscribe((response) => {
            console.log(response);
        });
    }
    */
}
