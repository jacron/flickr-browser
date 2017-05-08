import {ServiceStorage} from "./service.storage";
import {URLSearchParams} from "@angular/http";
import {Injectable, OnInit} from "@angular/core";
// import apiConfig = require("../api.config");
import {flickrUrls} from "../helpers/urls";
import {ownNsid} from "../api.config";

/**
 * Created by orion on 14/03/2017.
 */

@Injectable()
export class ServiceSearchSettings implements OnInit {

  public text = "";
  public tags = "";
  public safe = "1";
  public sort = "date-posted-desc";
  public tagMode = "any";
  public tagsOrText = "text";
  public viewSort = "";
  public my = false;
  public myNsid = ownNsid;

  constructor(
        private serviceStorage: ServiceStorage,
    ) {}

    public ngOnInit() {
        this.myNsid = ownNsid;
    }

    public retrieveFromStorage() {
        this.text = this.serviceStorage.get("text") || "";
        this.tags = this.serviceStorage.get("tags") || "";
        this.safe = this.serviceStorage.get("safe");
        this.sort = this.serviceStorage.get("sort") || "date-posted-desc";
        this.tagMode = this.serviceStorage.get("tag_mode") || "any";
        this.tagsOrText = this.serviceStorage.get("tags_or_text") || "text";
        this.my = this.serviceStorage.get("mine") === "true";
        if (this.text === "undefined") {
            this.text = " ";
        }
    }

    public persistToStorage() {
        this.serviceStorage.set("text", this.text);
        this.serviceStorage.set("tags", this.tags);
        this.serviceStorage.set("safe", this.safe);
        this.serviceStorage.set("sort", this.sort);
        this.serviceStorage.set("tag_mode", this.tagMode);
        this.serviceStorage.set("mine", this.my.toString());
    }

    public getSearchParams(): URLSearchParams {
        const searchParams = new URLSearchParams();
        if (this.tagsOrText === "text") {
            searchParams.append("text", this.text);
        } else {
            searchParams.append("tags", this.text);
        }
        searchParams.append("safe_search", this.safe);
        searchParams.append("extras", flickrUrls.extra.full);
        searchParams.append("content_type", "1");
        if (this.my) {
            searchParams.append("user_id", "53659177@N00");
        }
        searchParams.append("sort", this.sort);
        searchParams.append("tag_mode", this.tagMode);
        return searchParams;
    }

}
