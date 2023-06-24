import { Injectable } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map, take } from "rxjs";
import { FirebaseOperation } from "@angular/fire/compat/database/interfaces";
import { Hall } from "../model/hall-model";

@Injectable({
    providedIn: 'root'
})

export class HallService {
    constructor(private db: AngularFireDatabase) {}

    getAllItems(): Observable<SnapshotAction<any>[]> {
        return this.db
        .list('/halls')
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


    AddItem(item: Hall): any {
        return this.db.list('/halls/').set(item.number.toString(), {
          number: item.number,
          description: item.description,
          urlImage1: item.urlImage1,
          price: item.price,
          title: item.title
        });
      }

      getItembyId(uid: string): Observable<any> {
        return this.db
          .object('/halls/' + uid)
          .snapshotChanges()
          .pipe(
            map((item) => {
              const payloadItem: any = item.payload.val();
              const temporaryItem: Hall= {
                id: item.key as any,
                description: payloadItem.description,
                number: payloadItem.number,
                urlImage1: payloadItem.urlImage1,
                urlImage2: payloadItem.urlImage2,
                urlImage3: payloadItem.urlImage3,
                urlImage4: payloadItem.urlImage4,
                urlImage5: payloadItem.urlImage5,
                category: payloadItem.category,
                price: payloadItem.price,
                title: payloadItem.title
              };
              return temporaryItem;
            })
          );
      }
      getItemWithKey(id: string): any {
        return this.db
          .object('/halls/' + id)
          .snapshotChanges()
          .pipe(
            map((modifiedItem) => ({
              key: modifiedItem.payload.key,
              ...(modifiedItem.payload.val() as any),
            }))
          );
      }
    
      updateItem(item: Hall): any {
        return this.db.object('/halls/' + item.id).update({
          number: item.number,
          description: item.description,
          urlImage1: item.urlImage1,
          urlImage2: item.urlImage2,
          urlImage3: item.urlImage3,
          urlImage4: item.urlImage4,
          urlImage5: item.urlImage5,
          category: item.category,
          price: item.price,
          title: item.title
        });
      }
    
      deleteItem(id: string): any {
        return this.db.object('/halls/' + id).remove();
      }

      getReservedDays(itemId: any): any {
        return this.db.list(`/orders/` + itemId + `/reservations/`).valueChanges();
      }

      async addInBasket(room: any): Promise<void> {
        const cartId = localStorage.getItem('cartId');
    
        if (!cartId) {
          const cart = await this.db.list('/shoppingCart').push({
            dateCreated: new Date().getTime(),
          });
          localStorage.setItem('cartId', cart.key as any);
    
          this.addRoomInBasket(cart.key, room);
        } else {
          this.addRoomInBasket(localStorage.getItem('cartId'), room);
        }
      }
    
      addRoomInBasket(
        idCart: string | null,
        roomCreation: { key: FirebaseOperation }
      ): void {
        this.db
          .object('/shoppingCart/' + idCart + '/items/' + roomCreation.key)
          .snapshotChanges()
          .pipe(take(1))
          .subscribe((roomCart) => {
            if (!roomCart.key) {
              this.db
                .list('/shoppingCart/' + idCart + '/items/')
                .set(roomCreation.key, { room: roomCreation });
            }
          });
      }
    
      deleteRoomShoppingCart(id: string): any {
        const cartId = localStorage.getItem('cartId');
        return this.db.object('/shoppingCart/' + cartId + '/items/' + id).remove();
      }
    
}