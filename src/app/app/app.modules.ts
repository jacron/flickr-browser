/**
 * Created by orion on 26/02/2017.
 */
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import {AboutComponent} from "../component/about.component";
import {AlbumsComponent} from "../component/albums.component";
import { AppComponent } from "../component/app.component";
import {BrowseComponent} from "../component/browse.component";
import {BuddiesComponent} from "../component/buddies.component";
import {BuddyComponent} from "../component/buddy.component";
import {ExifComponent} from "../component/exif.component";
import {ExploreComponent} from "../component/explore.component";
import {FaverersComponent} from "../component/faverers.component";
import {FaverersListComponent} from "../component/favererslist.component";
import {FavoritesComponent} from "../component/favorites.component";
import {FavoritesListComponent} from "../component/favoriteslist.component";
import {FollowingComponent} from "../component/following.component";
import {GroupsComponent} from "../component/groups.component";
import {GroupsListComponent} from "../component/groupslist.component";
import {InterestingComponent} from "../component/interesting.component";
import {MessageComponent} from "../component/message.component";
import {MyComponent} from "../component/my.component";
import {PageNavigationComponent} from "../component/page-navigation.component";
import { PhotoDetailsComponent } from "../component/photo-details.component";
import { PhotoListComponent} from "../component/photo-list.component";
import {QueryTextComponent} from "../directives/query-selector/component.query-text";
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
import {CameraComponent} from "../component/camera.component";
import {LensesComponent} from "../component/lenses.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        InfiniteScrollModule,
    ],
    declarations: [
        AppComponent,
        PhotoDetailsComponent,
        PhotoListComponent,
        BrowseComponent,
        ExploreComponent,
        MyComponent,
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
