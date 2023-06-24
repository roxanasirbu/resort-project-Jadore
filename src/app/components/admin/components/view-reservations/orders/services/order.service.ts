import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: AngularFireDatabase) {}

  createOrder(order: unknown): any {
    return this.db.list('/orders').push(order);
  }

  getOrderId(userId: string | number | boolean | null): any {
    return this.db
      .list('/orders/', (ref) => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map((idOrders) => {
          return idOrders.map((ids) => {
            return ids.key;
          });
        })
      );
  }

  getItemsByOrderID(idOrder: string): any {
    return this.db
      .object('/orders/' + idOrder + '/items/')
      .snapshotChanges()
      .pipe(
        map((rooms) => {
          return rooms.payload.val();
        })
      );
  }
}
