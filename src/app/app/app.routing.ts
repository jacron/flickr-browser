/**
 * Created by orion on 27/02/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "../component/component.about";
import {AlbumsComponent} from "../component/component.albums";
import {BrowseComponent} from "../component/component.browse";
import {ExploreComponent} from "../component/component.explore";
import {FaverersComponent} from "../component/component.faverers";
import {FaverersListComponent} from "../component/component.favererslist";
import {FavoritesComponent} from "../component/component.favorites";
import {FavoritesListComponent} from "../component/component.favoriteslist";
import {FollowingComponent} from "../component/component.following";
import {GroupsComponent} from "../component/component.groups";
import {GroupsListComponent} from "../component/component.groupslist";
import {InterestingComponent} from "../component/component.interesting";
import {MyComponent} from "../component/component.my";
import {RecentComponent} from "../component/component.recent";
import {TagsComponent} from "../component/component.tags";
import {CameraComponent} from "../component/component.camera";
import {LensesComponent} from "../component/component.lenses";

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
