import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { OrderService } from 'src/app/components/orders/services/order.service';
import { ShoppingBasketService } from 'src/app/components/basket/services/shopping-basket.service'; 
import { CategoryService } from 'src/app/components/rooms/services/category.service';
import { RoomService } from 'src/app/components/rooms/services/room.service';

@Component({
  selector: 'app-reservations-a',
  templateUrl: './reservations-a.component.html',
  styleUrls: ['./reservations-a.component.css'],
})
export class ReservationsAComponent implements OnInit {
  categories: any[] = [];
  rooms: any[] = [];
  orderID: any;
  subscription: Subscription = new Subscription();
  currentShoppingCartRooms: any[] = [];
  ownedRooms: any[] = [];
  currentTime: number = Date.now();

  constructor(
    private serviceCategorie: CategoryService,
    private serviceRoom: RoomService,
    private serviceShoppingCart: ShoppingBasketService,
    private loginService: LoginService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderID = localStorage.getItem('orderId');

    this.subscription = this.serviceCategorie
      .getAllRoomsCategories()
      .pipe(
        mergeMap((categories: any) =>
          this.serviceRoom
            .getAllRooms()
            .pipe(
              mergeMap((rooms) =>
                this.serviceShoppingCart
                  .getListItemsShoppingCart()
                  .pipe(
                    map((currentAddedRoomsInTheShoppingCart) => [
                      categories,
                      rooms,
                      currentAddedRoomsInTheShoppingCart,
                    ])
                  )
              )
            )
        )
      )
      .subscribe(([categories, rooms, currentAddedRoomsInTheShoppingCart]) => {
        this.categories = categories;
        this.rooms = rooms;
        this.currentShoppingCartRooms = currentAddedRoomsInTheShoppingCart;
      });

    this.loginService
      .getUserAuth()
      .pipe(
        switchMap((userDb: { id: string | number | boolean | null }) => {
          return this.orderService.getOrderId(userDb.id).pipe(
            switchMap((items: any[]) => {
              const roomsArray: any[] = [];
              items.forEach((idOrder: string) => {
                this.orderService
                  .getItemsByOrderID(idOrder)
                  .pipe(
                    map((roomsOrders) => {
                      return roomsOrders;
                    })
                  )
                  .subscribe((roomsOrders: any[]) => {
                    roomsOrders.forEach((room) => {
                      roomsArray.push(room);
                    });
                  });
              });

              this.ownedRooms = roomsArray;
              return roomsArray;
            })
          );
        })
      )
      .subscribe();
  }

  formatTime(reservationDay: string): any {
    return new Date(reservationDay).getTime();
  }

  checkIfAvailable(reservationDay: string): boolean {
    return this.currentTime >= this.formatTime(reservationDay);
  }

  noReservations(): boolean {
    return this.ownedRooms.length === 0;
  }
}
