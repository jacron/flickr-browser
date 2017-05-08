import {apiKey} from "../api.config";
/**
 * Created by orion on 26/04/2017.
 */
// import apiConfig = require("../api.config");

const directUrl = "https://api.flickr.com/services/rest/?api_key=" +
    apiKey + "&format=json&nojsoncallback=1&method=";

// const proxyUrl = "http://flickrproxy/?proxy_method=simple&format=json&nojsoncallback=1&method=";
// const proxy2 = 'http://localhost:5000/?format=json&nojsoncallback=1&method=';
const apiUrl = directUrl;

const externalUrls = {
    dna: `https://bighugelabs.com/dna.php?username=$1`,
};

export const flickrUrls  = {
    staticName: {
        defaultBuddyIcon: `https://www.flickr.com/images/buddyicon.gif`,
        buddyIcon: `http://farm$1.staticflickr.com/$2/buddyicons/$3.jpg`,
        ownerPage: `https://www.flickr.com/photos/$1`,
        ownerPhotoPage: `https://www.flickr.com/photos/$1/with/$2`,
        tags: `https://www.flickr.com/photos/tags/$1`,
        group: `http://www.flickr.com/groups/$1`,
        photoPage: `https://farm$1.staticflickr.com/$2/$3_$4.jpg`,
        photoLPage: `https://farm$1.staticflickr.com/$2/$3_$4_h.jpg`,
        original: `https://farm$1.staticflickr.com/$2/$3_$4_o.$5`,
    },
    api: {
        geoLocation: `${apiUrl}flickr.photos.geo.getLocation`,
        contactsPublicList: `${apiUrl}flickr.contacts.getPublicList`,
        profile: `${apiUrl}flickr.profile.getProfile`,
        albumPhotos: `${apiUrl}flickr.photosets.getPhotos`,
        albums: `${apiUrl}flickr.photosets.getList`,
        poolPhotos: `${apiUrl}flickr.groups.pools.getPhotos`,
        publicGroups: `${apiUrl}flickr.people.getPublicGroups`,
        sizes: `${apiUrl}flickr.photos.getSizes`,
        photoInfo: `${apiUrl}flickr.photos.getInfo`,
        search: `${apiUrl}flickr.photos.search`,
        recent: `${apiUrl}flickr.photos.getRecent`,
        popular: `${apiUrl}flickr.photos.getPopular`,
        favorites: `${apiUrl}flickr.photos.getFavorites`,
        favoritesList: `${apiUrl}flickr.favorites.getList`,
        comments: `${apiUrl}flickr.photos.comments.getList`,
        allcontexts: `${apiUrl}flickr.photos.getAllContexts`,
        exif: `${apiUrl}flickr.photos.getExif`,
        explore: `${apiUrl}flickr.interestingness.getList`,
        tags: `${apiUrl}flickr.tags.getHotList`,
        peopleInfo: `${apiUrl}flickr.people.getInfo`,
        groupInfo: `${apiUrl}flickr.groups.getInfo`,
    },
    extra: {
        // return  'description, license, date_upload, date_taken, owner_name,
        // icon_server, original_format, last_update, geo, tags, machine_tags,
        // o_dims, views, media, path_alias, url_sq, url_t, url_s,
        // url_q, url_m, url_n, url_z, url_c, url_l, url_o';
        full: "description, date_taken, owner_name, icon_server, " +
        "original_format, tags, machine_tags, views, url_m, url_n, url_l, url_o",
    },
};

export function tagPage(tagName) {
    return flickrUrls.staticName.tags // `https://www.flickr.com/photos/tags/${tagName}`;
        .replace("$1", tagName);
}

export function favOwnerPage(fav): string {
    return flickrUrls.staticName.ownerPage
        .replace("$1", fav.nsid);
}

export function getGroupIconSrc(group) {
    if (group.iconserver && group.iconserver !== "0") {
        const id = group.id || group.nsid;
        return flickrUrls.staticName.buddyIcon
            .replace("$1", group.iconfarm)
            .replace("$2", group.iconserver)
            .replace("$3", id);
    }
    return flickrUrls.staticName.defaultBuddyIcon;
}

export function groupSrc(name): string {
    return flickrUrls.staticName.group
        .replace("$1", name);
}

export function buddyFavIconSrc(fav): string {
    if (fav.iconfarm) {
        return flickrUrls.staticName.buddyIcon
            .replace("$1", fav.iconfarm)
            .replace("$2", fav.iconserver)
            .replace("$3", fav.nsid);
    }
    return flickrUrls.staticName.defaultBuddyIcon;
}

export function getBuddyIconSrc(photo): string {
    if (photo.iconserver) {
        return flickrUrls.staticName.buddyIcon
            .replace("$1", photo.iconfarm)
            .replace("$2", photo.iconserver)
            .replace("$3", photo.owner);
    }
    return flickrUrls.staticName.defaultBuddyIcon;
}

export function photoOwnerPage(photoId, photoOwner) {
    return flickrUrls.staticName.ownerPhotoPage
        .replace("$1", photoOwner)
        .replace("$2", photoId);
}

export function photoSrc(photo) {
    return flickrUrls.staticName.photoPage
        .replace("$1", photo.farm)
        .replace("$2", photo.server)
        .replace("$3", photo.id)
        .replace("$4", photo.secret);
}

export function photoLSrc(photo) {
    return flickrUrls.staticName.photoLPage
        .replace("$1", photo.farm)
        .replace("$2", photo.server)
        .replace("$3", photo.id)
        .replace("$4", photo.secret);
}

export function dnaUrl(nsid): string {
    return externalUrls.dna
        .replace("$1", nsid);
}

export function buddyCommentIconSrc(comment): string {
    return flickrUrls.staticName.buddyIcon
        .replace("$1", comment.iconfarm)
        .replace("$2", comment.iconserver)
        .replace("$3", comment.author);
}

export function  getCommentOwnerPage(comment) {
    return flickrUrls.staticName.ownerPage
        .replace("$1", comment.author);
}

function  photoOriginalSrc(photo) {
    return flickrUrls.staticName.original
        .replace("$1", photo.farm)
        .replace("$2", photo.server)
        .replace("$3", photo.id)
        .replace("$4", photo.originalsecret)
        .replace("$5", photo.originalformat);
}

export function getOriginal(photo) {
    if (!photo.originalsecret) {
        return photoLSrc(photo);
    }
    return photoOriginalSrc(photo);
}

