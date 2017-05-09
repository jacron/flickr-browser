/**
 * Created by orion on 27/02/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "../component/about.component";
import {AlbumsComponent} from "../component/albums.component";
import {BrowseComponent} from "../component/browse.component";
import {ExploreComponent} from "../component/explore.component";
import {FaverersComponent} from "../component/faverers.component";
import {FaverersListComponent} from "../component/favererslist.component";
import {FavoritesComponent} from "../component/favorites.component";
import {FavoritesListComponent} from "../component/favoriteslist.component";
import {FollowingComponent} from "../component/following.component";
import {GroupsComponent} from "../component/groups.component";
import {GroupsListComponent} from "../component/groupslist.component";
import {InterestingComponent} from "../component/interesting.component";
import {MyComponent} from "../component/my.component";
import {RecentComponent} from "../component/recent.component";
import {TagsComponent} from "../component/tags.component";
import {CameraComponent} from "../component/camera.component";
import {LensesComponent} from "../component/lenses.component";

const appRoutes: Routes = [
    {
        path: "browse",
        component: BrowseComponent,
    },
    {
        path: "explore",
        component: ExploreComponent,
    },
    {
        path: "tags",
        component: TagsComponent,
    },
    {
        path: "my",
        component: MyComponent,
    },
    {
        path: "recent",
        component: RecentComponent,
    },
    {
        path: "faverers",
        component: FaverersComponent,
    },
    {
        path: "favererslist/:nsid",
        component: FaverersListComponent,
    },
    {
        path: "favorites",
        component: FavoritesComponent,
    },
    {
        path: "favoritelist/:nsid",
        component: FavoritesListComponent,
    },
    {
        path: "groups",
        component: GroupsComponent,
    },
    {
        path: "grouplist/:nsid",
        component: GroupsListComponent,
    },
    {
        path: "albums",
        component: AlbumsComponent,
    },
    {
        path: "following",
        component: FollowingComponent,
    },
    {
        path: "interesting",
        component: InterestingComponent,
    },
    {
        path: "about",
        component: AboutComponent,
    },
    {
        path: "camera",
        component: CameraComponent,
    },
    {
        path: "lenses",
        component: LensesComponent,
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "browse",
    },
];

export const routing = RouterModule.forRoot(appRoutes);
