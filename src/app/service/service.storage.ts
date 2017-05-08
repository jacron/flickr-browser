/**
 * Created by orion on 27/02/2017.
 */

export class ServiceStorage {

    public get(key: string) {
        return window.localStorage.getItem(key);
    }

    public set(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    public setJSON(key: string, value: any) {
        this.set(key, JSON.stringify(value));
    }

    public getJSON(key: string) {
        const value = this.get(key);
        if (!value) {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            console.log(e);
            console.log(value);
        }
        return null;
    }

}
