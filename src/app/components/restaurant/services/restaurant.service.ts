import { Injectable } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map, take } from "rxjs";
import { FirebaseOperation } from "@angular/fire/compat/database/interfaces";
import { Restaurant } from "../model/restaurant_model";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {
    constructor(private db: AngularFireDatabase) {}

    getAllItems(): Observable<SnapshotAction<any>[]> {
        return this.db
        .list('/restaurant')
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((c) => ({
              key: c.payload.key,
              ...(c.payload.val() as any),
            }))
          )
        );
    }


    AddItem(item: Restaurant): any {
        return this.db.list('/restaurant/').set(item.number.toString(), {
          number: item.number,
          description: item.description,
          category: item.category,
          price: item.price,
          urlImage1: item.urlImage1,
          title: item.title
        });
      }

      getItembyId(uid: string): Observable<any> {
        return this.db
          .object('/restaurant/' + uid)
          .snapshotChanges()
          .pipe(
            map((item) => {
              const payloadItem: any = item.payload.val();
              const temporaryItem: Restaurant= {
                id: item.key as any,
                category: payloadItem.category,
                description: payloadItem.description,
                price: payloadItem.price,
                number: payloadItem.number,
                urlImage1: payloadItem.urlImage1,
                title: payloadItem.title
              };
              return temporaryItem;
            })
          );
      }
      getItemWithKey(id: string): any {
        return this.db
          .object('/restaurant/' + id)
          .snapshotChanges()
          .pipe(
            map((modifiedItem) => ({
              key: modifiedItem.payload.key,
              ...(modifiedItem.payload.val() as any),
            }))
          );
      }
    
      updateItem(item: Restaurant): any {
        return this.db.object('/restaurant/' + item.id).update({
          number: item.number,
          description: item.description,
          category: item.category,
          price: item.price,
          urlImage1: item.urlImage1,
          title: item.title
        });
      }
    
      deleteItem(id: string): any {
        return this.db.object('/restaurant/' + id).remove();
      }
}