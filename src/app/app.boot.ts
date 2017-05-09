/**
 * Created by orion on 26/02/2017.
 */
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.modules";
// import {enableProdMode} from "@angular/core";

// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule).then();
