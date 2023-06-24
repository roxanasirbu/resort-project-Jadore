import { Injectable } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map, take } from "rxjs";
import { FirebaseOperation } from "@angular/fire/compat/database/interfaces";
import { Room } from "../models/model.room";

@Injectable({
    providedIn: 'root'
})

export class RoomService{
    constructor(private db: AngularFireDatabase) {}

    getAllRooms(): Observable<SnapshotAction<any>[]> {
      return this.db
        .list('/rooms')
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((rRoom) => ({
              key: rRoom.payload.key,
              ...(rRoom.payload.val() as any),
            }))
          )
        );
    }
  
    createRoom(room: Room): any {
      return this.db.list('/rooms/').set(room.number.toString(), {
        number: room.number,
        description: room.description,
        category: room.category,
        price: room.price,
        urlImage1: room.urlImage1,
        urlImage2: room.urlImage2,
        urlImage3: room.urlImage3,
        urlImage4: room.urlImage4,
        amenities: room.amenities,
        title: room.title
      });
    }
  
    getRoombyId(uid: string): Observable<any> {
      return this.db
        .object('/rooms/' + uid)
        .snapshotChanges()
        .pipe(
          map((room) => {
            const payloadRoom: any = room.payload.val();
            const aRoom: Room = {
              id: room.key as any,
              category: payloadRoom.category,
              description: payloadRoom.description,
              price: payloadRoom.price,
              number: payloadRoom.number,
              urlImage1: payloadRoom.urlImage1,
              urlImage2: payloadRoom.urlImage2,
              urlImage3: payloadRoom.urlImage3,
              urlImage4: payloadRoom.urlImage4,
              amenities: payloadRoom.amenities,
              title: payloadRoom.title
            };
            return aRoom;
          })
        );
    }
    getRoomWithKey(id: string): any {
      return this.db
        .object('/rooms/' + id)
        .snapshotChanges()
        .pipe(
          map((modifiedRoom) => ({
            key: modifiedRoom.payload.key,
            ...(modifiedRoom.payload.val() as any),
          }))
        );
    }
  
    updateRoom(room: Room): any {
      return this.db.object('/rooms/' + room.id).update({
        number: room.number,
        description: room.description,
        category: room.category,
        price: room.price,
        urlImage1: room.urlImage1,
        urlImage2: room.urlImage2,
        urlImage3: room.urlImage3,
        urlImage4: room.urlImage4,
        amenities: room.amenities,
        title: room.title
      });
    }
  
    deleteRoom(id: string): any {
      return this.db.object('/rooms/' + id).remove();
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
  
    getReservedDays(roomId: any): any {
      return this.db.list(`/orders/` + roomId + `/reservations/`).valueChanges();
    }
   
}