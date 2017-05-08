/**
 * Created by orion on 26/04/2017.
 */

export interface IDictionary {
    [ index: string]: ILink[];
}

interface ILink {
    url: string;
    name: string;
}
