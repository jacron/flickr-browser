/**
 * Created by orion on 11/03/2017.
 */
import {Component} from "@angular/core";
@Component({
    templateUrl: "../../partials/interesting.html",
    styleUrls: ["../../css/browse.css"],
})
export class InterestingComponent {
    /* tslint:disable:no-empty */
    constructor() {}

    public links = [
        {
            url: "https://www.flickr.com/services/api/",
            name: "API doc",
        },
        {
            url: "https://www.flickr.com/services/api/tos/",
            name: "API tos",
        },
        {
            url: "https://bighugelabs.com/scout.php",
            name: "scout",
        },
        {
            url: "https://bighugelabs.com/dna.php",
            name: "dna",
        },
        {
            url: "http://statsr.net/top-flickr/",
            name: "statsr",
        },
        {
            url: "https://www.flickr.com/photos/ironrodart/6144091654",
            name: "how to get explored",
        },
    ];
}
