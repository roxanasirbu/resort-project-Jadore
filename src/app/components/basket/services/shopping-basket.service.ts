import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {
  constructor(private db: AngularFireDatabase) {}

  addRoomInBasket(
    idCart: string | null,
    roomCreationforCart: { key: FirebaseOperation }
  ): void {
    this.db
      .object('/shoppingCart/' + idCart + '/items/' + roomCreationforCart.key)
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((roomCart) => {
        if (!roomCart.key) {
          this.db
            .list('/shoppingCart/' + idCart + '/items/')
            .set(roomCreationforCart.key, { room: roomCreationforCart });
        }
      });
  }
  getListItemsShoppingCart(): Observable<any> {
    const cartId = localStorage.getItem('cartId');
    return this.db
      .list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(
        map((items: any[]) =>
          items.map((cart) => ({
            key: cart.payload.key,
            ...cart.payload.val(),
          }))
        )
      );
  }
  getListItemsShoppingCartMapItems(): any {
    const cartId = localStorage.getItem('cartId');
    return this.db
      .list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(
        map((items) =>
          items.map((c) => ({
            key: c.payload.key,
            ...(c.payload.val() as any).room,
          }))
        )
      );
  }
  clearShoppingCart(): void {
    const cartId = localStorage.getItem('cartId');
    this.db.object('/shoppingCart/' + cartId + '/items/').remove();
  }
}
