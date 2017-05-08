System.register(["@angular/core", "rxjs/BehaviorSubject", "./service.search", "../helpers/util", "../helpers/photo_util", "../helpers/urls"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, BehaviorSubject_1, service_search_1, util_1, photo_util_1, urls_1, ServiceFaverers, ServiceFaverers_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (service_search_1_1) {
                service_search_1 = service_search_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (photo_util_1_1) {
                photo_util_1 = photo_util_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            ServiceFaverers = ServiceFaverers_1 = (function () {
                function ServiceFaverers(serviceSearch) {
                    this.serviceSearch = serviceSearch;
                    // Observable source
                    this.source = new BehaviorSubject_1.BehaviorSubject(0);
                    // Observable stream
                    this.faverers$ = this.source.asObservable();
                }
                /*
                 Geef een ongetypeerd object met de nodige gegevens voor een persoon.
                 */
                ServiceFaverers.packedPerson = function (person) {
                    var name = person.realname || person.username;
                    var buddyIcon = person.iconfarm === 0 ? urls_1.flickrUrls.staticName.defaultBuddyIcon
                        : urls_1.buddyFavIconSrc(person);
                    return {
                        buddyicon: buddyIcon,
                        ownerpage: urls_1.favOwnerPage(person),
                        name: name,
                        nsid: person.nsid,
                        items: [],
                    };
                };
                /*
                 In het veld item_ids worden de id's van de gefavede foto's alvast opgeslagen,
                 zodat we gelijk ook het aantal al hebben om te tonen.
                 */
                ServiceFaverers.prototype.storePhotoFaverer = function (person, itemId) {
                    var found = false;
                    var name = person.realname && person.realname.length > 0 ? person.realname : person.username;
                    for (var _i = 0, _a = this.persons; _i < _a.length; _i++) {
                        var pp = _a[_i];
                        if (pp.name === name) {
                            found = true;
                            pp.items.push(photo_util_1.fave_item(person.favedate, itemId));
                            break;
                        }
                    }
                    if (!found) {
                        var newPerson = ServiceFaverers_1.packedPerson(person);
                        newPerson.items.push(photo_util_1.fave_item(person.favedate, itemId));
                        this.persons.push(newPerson);
                    }
                };
                /*
                 Faverers worden in een lijst opgenomen (geen dubbelen).
                 */
                ServiceFaverers.prototype.storePhotoFaverers = function (persons, itemId) {
                    this.favoritesCount += persons.length;
                    for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
                        var person = persons_1[_i];
                        this.storePhotoFaverer(person, itemId);
                    }
                };
                /*
                 In de laatste iteratie van het ophalen van favorieten
                 kan het resultaat worden gesorteerd en teruggegeven
                 */
                ServiceFaverers.prototype.onGetPersonsPageComplete = function () {
                    // is de laatste pagina inmiddels verwerkt?
                    this.pagesTodo--;
                    if (this.pagesTodo === 0) {
                        util_1.sortField(this.persons, "name", util_1.sort_direction.Asc, util_1.sort_type.Alphanum);
                        this.source.next({
                            persons: this.persons,
                            favoritesCount: this.favoritesCount,
                        });
                    }
                };
                /*
                 Elke foto heeft 'favorieten', i.e. personen die hem hebben gefave'd.
                 Bij elke foto uit mijn collectie worden deze personen opgehaald, waarna
                 een lijst van alle 'faverers' wordt samengesteld.
                 */
                ServiceFaverers.prototype.getFavorites = function (photos) {
                    var _this = this;
                    var photosTodo = photos.length;
                    var _loop_1 = function (photo) {
                        this_1.serviceSearch.getFavorites(photo.id, 50).subscribe(function (response) {
                            var persons = response.favorites;
                            _this.storePhotoFaverers(persons, photo.id);
                            if (--photosTodo === 0) {
                                _this.onGetPersonsPageComplete();
                            }
                        });
                    };
                    var this_1 = this;
                    for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                        var photo = photos_1[_i];
                        _loop_1(photo);
                    }
                };
                // service command
                ServiceFaverers.prototype.getFaverers = function () {
                    var _this = this;
                    // returned total number is 136, but stats say 242 (public)
                    // therefor the total number is unreliable
                    // strange fix: include searchparameter content-type
                    //
                    // er waren 47 faverers, maar er zijn er 67 als je getPopular gebruikt
                    // maar getPopular geeft ook als total 224
                    var perPage = 50; // max allowed: 500 (use smaller number than total, to practice the algoritm)
                    this.favoritesCount = 0;
                    this.serviceSearch.myPhotosTotal().subscribe(function (total) {
                        if (total) {
                            var pages = util_1.calcPagesFromTotal(total, perPage);
                            _this.pagesTodo = pages;
                            _this.persons = [];
                            for (var i = 0; i < pages; i++) {
                                _this.serviceSearch.myPhotosPage(i + 1, perPage, false).subscribe(function (photos) {
                                    if (photos && photos.photo.length > 0) {
                                        _this.getFavorites(photos.photo);
                                    }
                                    else {
                                        console.log("empty result");
                                        _this.onGetPersonsPageComplete();
                                    }
                                });
                            }
                        }
                    });
                };
                return ServiceFaverers;
            }());
            ServiceFaverers = ServiceFaverers_1 = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [service_search_1.ServiceSearch])
            ], ServiceFaverers);
            exports_1("ServiceFaverers", ServiceFaverers);
        }
    };
});
//# sourceMappingURL=service.faverers.js.map