import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ServiceSearch} from "./service.search";
import {
    calcPagesFromTotal, sort_direction, sort_type,
    sortField,
} from "../helpers/util";
import {fave_item} from "../helpers/photo_util";
import {buddyFavIconSrc, favOwnerPage, flickrUrls} from "../helpers/urls";

/**
 * Created by orion on 13/03/2017.
 */

@Injectable()
export class ServiceFaverers {

    public persons: any[];
    public pagesTodo: number;
    public favoritesCount: number;

  // Observable source
  private source = new BehaviorSubject<any>(0);

  // Observable stream
  public faverers$ = this.source.asObservable();

  /*
   Geef een ongetypeerd object met de nodige gegevens voor een persoon.
   */
  private static packedPerson(person: any): any {
    const name = person.realname || person.username;
    const buddyIcon = person.iconfarm === 0 ? flickrUrls.staticName.defaultBuddyIcon
      : buddyFavIconSrc(person);
    return {
      buddyicon: buddyIcon,
      ownerpage: favOwnerPage(person),
      name,
      nsid: person.nsid,
      items: [],
    };
  }

  /*
   In het veld item_ids worden de id's van de gefavede foto's alvast opgeslagen,
   zodat we gelijk ook het aantal al hebben om te tonen.
   */
  private storePhotoFaverer(person, itemId) {
    let found = false;
    const name = person.realname && person.realname.length > 0 ? person.realname : person.username;
    for (const pp of this.persons) {
      if (pp.name === name) {
        found = true;
        pp.items.push(fave_item(person.favedate, itemId));
        break;
      }
    }
    if (!found) {
      const newPerson = ServiceFaverers.packedPerson(person);
      newPerson.items.push(fave_item(person.favedate, itemId));
      this.persons.push(newPerson);
    }
  }

  /*
   Faverers worden in een lijst opgenomen (geen dubbelen).
   */
  private storePhotoFaverers(persons, itemId) {
    this.favoritesCount += persons.length;
    for (const person of persons) {
      this.storePhotoFaverer(person, itemId);
    }
  }

  constructor(
        private serviceSearch: ServiceSearch,
    ) {}

    /*
     In de laatste iteratie van het ophalen van favorieten
     kan het resultaat worden gesorteerd en teruggegeven
     */
    private onGetPersonsPageComplete() {
        // is de laatste pagina inmiddels verwerkt?
        this.pagesTodo--;
        if (this.pagesTodo === 0) {
            sortField(this.persons, "name", sort_direction.Asc, sort_type.Alphanum);
            this.source.next({
                persons: this.persons,
                favoritesCount: this.favoritesCount,
            });
        }
    }

    /*
     Elke foto heeft 'favorieten', i.e. personen die hem hebben gefave'd.
     Bij elke foto uit mijn collectie worden deze personen opgehaald, waarna
     een lijst van alle 'faverers' wordt samengesteld.
     */
    private getFavorites(photos) {
        let photosTodo: number = photos.length;
        for (const photo of photos) {
            this.serviceSearch.getFavorites(photo.id, 50).subscribe((response) => {
                const persons = response.favorites;
                this.storePhotoFaverers(persons, photo.id);
                if (--photosTodo === 0) {
                    this.onGetPersonsPageComplete();
                }
            });
        }
    }

    // service command
    public getFaverers() {
        // returned total number is 136, but stats say 242 (public)
        // therefor the total number is unreliable
        // strange fix: include searchparameter content-type
        //
        // er waren 47 faverers, maar er zijn er 67 als je getPopular gebruikt
        // maar getPopular geeft ook als total 224
        const perPage = 50;  // max allowed: 500 (use smaller number than total, to practice the algoritm)
        this.favoritesCount = 0;
        this.serviceSearch.myPhotosTotal().subscribe((total) => {
            if (total) {
                const pages = calcPagesFromTotal(total, perPage);

                this.pagesTodo = pages;
                this.persons = [];
                for (let i = 0; i < pages; i++) {
                    this.serviceSearch.myPhotosPage(i + 1, perPage, false).subscribe((photos) => {
                        if (photos && photos.photo.length > 0) {
                            this.getFavorites(photos.photo);
                        } else {
                            console.log("empty result");
                            this.onGetPersonsPageComplete();
                        }
                    });
                }
            }
        });
    }

}
