/**
 * Created by orion on 11/03/2017.
 */
import {Component} from "@angular/core";
import {IDictionary} from "../interface/idictionary";
@Component({
    templateUrl: "../../partials/about.html",
    styleUrls: ["../../css/browse.css"],
})
export class AboutComponent {
    public linksDictionary: IDictionary = {
        "API": [
            {
                url: "https://www.flickr.com/services/api/",
                name: "API doc",
            },
            {
                url: "https://www.flickr.com/services/api/tos/",
                name: "API tos",
            },
        ],
        "STRATEGY": [
            {
                url: "https://www.flickr.com/people/nijlgier/contacts/rev/",
                name: "my followers",
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
        ],
        "OTHER BROWSERS": [
            {
                url: "http://flickriver.com/about/",
                name: "flickriver",
            },
            {
                url: "https://hiveminer.com/",
                name: "flickrhivemind",
            },
        ],
    };
    public linksDictionaryKeys(): string[] {
        return Object.keys(this.linksDictionary);
    }
}

