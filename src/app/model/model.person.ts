import {cloneProperties} from "../helpers/util";
import {
    buddyFavIconSrc, dnaUrl, favOwnerPage, getGroupIconSrc,
    groupSrc,
} from "../helpers/urls";
/**
 * Created by orion on 31/03/2017.
 */
export class PersonModel {
    public items: any[];
    public nsid: string;
    public ownerpage: string;
    public username: string;
    public realname: string;
    public name: string;
    public buddyicon: string;
    public dna: string;
    public short: boolean;
    public profileDescription: string;
    public favoritesCount: number;
    public website: string;
    public hometown: string;
    public occupation: string;
    public city: string;
    public country: string;

    private buddyPack(person) {
        this.buddyicon = buddyFavIconSrc(person);
        this.ownerpage = favOwnerPage(person);
        cloneProperties(["username", "realname", "nsid"], person, this);
        this.name = person.realname || person.username;
        return this;
    }

    public static buddyPackedPerson(person) {
        const p = new PersonModel();
        return p.buddyPack(person);
    }
    public static buddyPackedPersonExtra(person): PersonModel {
        const newPerson = new PersonModel();
        newPerson.buddyicon = buddyFavIconSrc(person);
        newPerson.ownerpage = favOwnerPage(person);
        newPerson.dna = dnaUrl(person.nsid);
        newPerson.realname = person.realname ? person.realname._content : null;
        newPerson.username = person.username ? person.username._content : null;
        newPerson.name = newPerson.realname || newPerson.username;
        return newPerson;
    }

    public static buddyPackedGroup(group): PersonModel {
        // groups have property name, not username or realname
        if (!group) {return null; }
        const newGroup = new PersonModel();
        const name = group.name ? group.name._content : null;
        newGroup.name = name;
        newGroup.short = true;
        newGroup.buddyicon = getGroupIconSrc(group);
        newGroup.ownerpage = groupSrc(group.id);
        newGroup.dna = null;
        newGroup.username = name;
        newGroup.realname = name;
        return newGroup;
    }
}
