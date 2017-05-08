System.register(["../api.config"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tagPage(tagName) {
        return flickrUrls.staticName.tags // `https://www.flickr.com/photos/tags/${tagName}`;
            .replace("$1", tagName);
    }
    exports_1("tagPage", tagPage);
    function favOwnerPage(fav) {
        return flickrUrls.staticName.ownerPage
            .replace("$1", fav.nsid);
    }
    exports_1("favOwnerPage", favOwnerPage);
    function getGroupIconSrc(group) {
        if (group.iconserver && group.iconserver !== "0") {
            var id = group.id || group.nsid;
            return flickrUrls.staticName.buddyIcon
                .replace("$1", group.iconfarm)
                .replace("$2", group.iconserver)
                .replace("$3", id);
        }
        return flickrUrls.staticName.defaultBuddyIcon;
    }
    exports_1("getGroupIconSrc", getGroupIconSrc);
    function groupSrc(name) {
        return flickrUrls.staticName.group
            .replace("$1", name);
    }
    exports_1("groupSrc", groupSrc);
    function buddyFavIconSrc(fav) {
        if (fav.iconfarm) {
            return flickrUrls.staticName.buddyIcon
                .replace("$1", fav.iconfarm)
                .replace("$2", fav.iconserver)
                .replace("$3", fav.nsid);
        }
        return flickrUrls.staticName.defaultBuddyIcon;
    }
    exports_1("buddyFavIconSrc", buddyFavIconSrc);
    function getBuddyIconSrc(photo) {
        if (photo.iconserver) {
            return flickrUrls.staticName.buddyIcon
                .replace("$1", photo.iconfarm)
                .replace("$2", photo.iconserver)
                .replace("$3", photo.owner);
        }
        return flickrUrls.staticName.defaultBuddyIcon;
    }
    exports_1("getBuddyIconSrc", getBuddyIconSrc);
    function photoOwnerPage(photoId, photoOwner) {
        return flickrUrls.staticName.ownerPhotoPage
            .replace("$1", photoOwner)
            .replace("$2", photoId);
    }
    exports_1("photoOwnerPage", photoOwnerPage);
    function photoSrc(photo) {
        return flickrUrls.staticName.photoPage
            .replace("$1", photo.farm)
            .replace("$2", photo.server)
            .replace("$3", photo.id)
            .replace("$4", photo.secret);
    }
    exports_1("photoSrc", photoSrc);
    function photoLSrc(photo) {
        return flickrUrls.staticName.photoLPage
            .replace("$1", photo.farm)
            .replace("$2", photo.server)
            .replace("$3", photo.id)
            .replace("$4", photo.secret);
    }
    exports_1("photoLSrc", photoLSrc);
    function dnaUrl(nsid) {
        return externalUrls.dna
            .replace("$1", nsid);
    }
    exports_1("dnaUrl", dnaUrl);
    function buddyCommentIconSrc(comment) {
        return flickrUrls.staticName.buddyIcon
            .replace("$1", comment.iconfarm)
            .replace("$2", comment.iconserver)
            .replace("$3", comment.author);
    }
    exports_1("buddyCommentIconSrc", buddyCommentIconSrc);
    function getCommentOwnerPage(comment) {
        return flickrUrls.staticName.ownerPage
            .replace("$1", comment.author);
    }
    exports_1("getCommentOwnerPage", getCommentOwnerPage);
    function photoOriginalSrc(photo) {
        return flickrUrls.staticName.original
            .replace("$1", photo.farm)
            .replace("$2", photo.server)
            .replace("$3", photo.id)
            .replace("$4", photo.originalsecret)
            .replace("$5", photo.originalformat);
    }
    function getOriginal(photo) {
        if (!photo.originalsecret) {
            return photoLSrc(photo);
        }
        return photoOriginalSrc(photo);
    }
    exports_1("getOriginal", getOriginal);
    var apiConfig, directUrl, apiUrl, externalUrls, flickrUrls;
    return {
        setters: [
            function (apiConfig_1) {
                apiConfig = apiConfig_1;
            }
        ],
        execute: function () {
            directUrl = "https://api.flickr.com/services/rest/?api_key=" +
                apiConfig.apiKey + "&format=json&nojsoncallback=1&method=";
            // const proxyUrl = "http://flickrproxy/?proxy_method=simple&format=json&nojsoncallback=1&method=";
            // const proxy2 = 'http://localhost:5000/?format=json&nojsoncallback=1&method=';
            apiUrl = directUrl;
            externalUrls = {
                dna: "https://bighugelabs.com/dna.php?username=$1",
            };
            exports_1("flickrUrls", flickrUrls = {
                staticName: {
                    defaultBuddyIcon: "https://www.flickr.com/images/buddyicon.gif",
                    buddyIcon: "http://farm$1.staticflickr.com/$2/buddyicons/$3.jpg",
                    ownerPage: "https://www.flickr.com/photos/$1",
                    ownerPhotoPage: "https://www.flickr.com/photos/$1/with/$2",
                    tags: "https://www.flickr.com/photos/tags/$1",
                    group: "http://www.flickr.com/groups/$1",
                    photoPage: "https://farm$1.staticflickr.com/$2/$3_$4.jpg",
                    photoLPage: "https://farm$1.staticflickr.com/$2/$3_$4_h.jpg",
                    original: "https://farm$1.staticflickr.com/$2/$3_$4_o.$5",
                },
                api: {
                    geoLocation: apiUrl + "flickr.photos.geo.getLocation",
                    contactsPublicList: apiUrl + "flickr.contacts.getPublicList",
                    profile: apiUrl + "flickr.profile.getProfile",
                    albumPhotos: apiUrl + "flickr.photosets.getPhotos",
                    albums: apiUrl + "flickr.photosets.getList",
                    poolPhotos: apiUrl + "flickr.groups.pools.getPhotos",
                    publicGroups: apiUrl + "flickr.people.getPublicGroups",
                    sizes: apiUrl + "flickr.photos.getSizes",
                    photoInfo: apiUrl + "flickr.photos.getInfo",
                    search: apiUrl + "flickr.photos.search",
                    recent: apiUrl + "flickr.photos.getRecent",
                    popular: apiUrl + "flickr.photos.getPopular",
                    favorites: apiUrl + "flickr.photos.getFavorites",
                    favoritesList: apiUrl + "flickr.favorites.getList",
                    comments: apiUrl + "flickr.photos.comments.getList",
                    allcontexts: apiUrl + "flickr.photos.getAllContexts",
                    exif: apiUrl + "flickr.photos.getExif",
                    explore: apiUrl + "flickr.interestingness.getList",
                    tags: apiUrl + "flickr.tags.getHotList",
                    peopleInfo: apiUrl + "flickr.people.getInfo",
                    groupInfo: apiUrl + "flickr.groups.getInfo",
                },
                extra: {
                    // return  'description, license, date_upload, date_taken, owner_name,
                    // icon_server, original_format, last_update, geo, tags, machine_tags,
                    // o_dims, views, media, path_alias, url_sq, url_t, url_s,
                    // url_q, url_m, url_n, url_z, url_c, url_l, url_o';
                    full: "description, date_taken, owner_name, icon_server, " +
                        "original_format, tags, machine_tags, views, url_m, url_n, url_l, url_o",
                },
            });
        }
    };
});
//# sourceMappingURL=urls.js.map