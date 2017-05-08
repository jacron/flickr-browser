System.register(["../helpers/util", "../helpers/urls"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var util_1, urls_1, PersonModel;
    return {
        setters: [
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            /**
             * Created by orion on 31/03/2017.
             */
            PersonModel = (function () {
                function PersonModel() {
                }
                PersonModel.prototype.buddyPack = function (person) {
                    this.buddyicon = urls_1.buddyFavIconSrc(person);
                    this.ownerpage = urls_1.favOwnerPage(person);
                    util_1.cloneProperties(["username", "realname", "nsid"], person, this);
                    this.name = person.realname || person.username;
                    return this;
                };
                PersonModel.buddyPackedPerson = function (person) {
                    var p = new PersonModel();
                    return p.buddyPack(person);
                };
                PersonModel.buddyPackedPersonExtra = function (person) {
                    var newPerson = new PersonModel();
                    newPerson.buddyicon = urls_1.buddyFavIconSrc(person);
                    newPerson.ownerpage = urls_1.favOwnerPage(person);
                    newPerson.dna = urls_1.dnaUrl(person.nsid);
                    newPerson.realname = person.realname ? person.realname._content : null;
                    newPerson.username = person.username ? person.username._content : null;
                    newPerson.name = newPerson.realname || newPerson.username;
                    return newPerson;
                };
                PersonModel.buddyPackedGroup = function (group) {
                    // groups have property name, not username or realname
                    if (!group) {
                        return null;
                    }
                    var newGroup = new PersonModel();
                    var name = group.name ? group.name._content : null;
                    newGroup.name = name;
                    newGroup.short = true;
                    newGroup.buddyicon = urls_1.getGroupIconSrc(group);
                    newGroup.ownerpage = urls_1.groupSrc(group.id);
                    newGroup.dna = null;
                    newGroup.username = name;
                    newGroup.realname = name;
                    return newGroup;
                };
                return PersonModel;
            }());
            exports_1("PersonModel", PersonModel);
        }
    };
});
//# sourceMappingURL=model.person.js.map