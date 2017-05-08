/**
 * Created by orion on 26/02/2017.
 */
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import {AboutComponent} from "../component/component.about";
import {AlbumsComponent} from "../component/component.albums";
import { AppComponent } from "../component/component.app";
import {BrowseComponent} from "../component/component.browse";
import {BuddiesComponent} from "../component/component.buddies";
import {BuddyComponent} from "../component/component.buddy";
import {ExifComponent} from "../component/component.exif";
import {ExploreComponent} from "../component/component.explore";
import {FaverersComponent} from "../component/component.faverers";
import {FaverersListComponent} from "../component/component.favererslist";
import {FavoritesComponent} from "../component/component.favorites";
import {FavoritesListComponent} from "../component/component.favoriteslist";
import {FollowingComponent} from "../component/component.following";
import {GroupsComponent} from "../component/component.groups";
import {GroupsListComponent} from "../component/component.groupslist";
import {InterestingComponent} from "../component/component.interesting";
import {MessageComponent} from "../component/component.message";
import {MyComponent} from "../component/component.my";
import {PageNavigationComponent} from "../component/component.page-navigation";
import { PhotoDetailsComponent } from "../component/component.photo-details";
import { PhotoListComponent} from "../component/component.photo-list";
import {QueryTextComponent} from "../directives/query-selector/component.query-text";
import {RecentComponent} from "../component/component.recent";
import {TagsComponent} from "../component/component.tags";
import {QueryPipe} from "../directives/query-selector/pipe.query";
import {ServiceAddFavorites} from "../service/service.add-favorites";
import {ServiceFaverers} from "../service/service.faverers";
import {ServiceFavorites} from "../service/service.favorites";
import {ServiceFavoritesList} from "../service/service.favoriteslist";
import {ServiceJustify} from "../service/service.justify";
import {ServicePhotoDetails} from "../service/service.photo-details";
import {ServicePhotos} from "../service/service.photos";
import { ServiceSearch } from "../service/service.search";
import {ServiceSearchSettings} from "../service/service.searchsettings";
import { ServiceStorage } from "../service/service.storage";
import {routing} from "./app.routing";
import {ServiceAddComments} from "../service/service.add-comments";
import {CameraComponent} from "../component/component.camera";
import {LensesComponent} from "../component/component.lenses";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        PhotoDetailsComponent,
        PhotoListComponent,
        BrowseComponent,
        ExploreComponent,
        TagsComponent,
        MyComponent,
        RecentComponent,
        InterestingComponent,
        AboutComponent,
        FaverersComponent,
        FaverersListComponent,
        FavoritesComponent,
        FavoritesListComponent,
        GroupsComponent,
        GroupsListComponent,
        MessageComponent,
        BuddyComponent,
        AlbumsComponent,
        ExifComponent,
        BuddiesComponent,
        FollowingComponent,
        PageNavigationComponent,
        QueryPipe,
        QueryTextComponent,
        CameraComponent,
        LensesComponent,
    ],
    providers: [
        ServiceSearch,
        ServiceStorage,
        ServiceFaverers,
        ServiceFavorites,
        ServiceSearchSettings,
        ServiceJustify,
        ServicePhotoDetails,
        ServiceFavoritesList,
        ServicePhotos,
        ServiceAddFavorites,
        ServiceAddComments,
    ],
    bootstrap: [
        AppComponent,
    ],
})

export class AppModule {}
