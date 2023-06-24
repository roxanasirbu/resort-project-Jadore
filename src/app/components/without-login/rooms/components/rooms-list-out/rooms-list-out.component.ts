import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/components/rooms/services/category.service';
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { ShoppingBasketService } from 'src/app/components/basket/services/shopping-basket.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-rooms-list-out',
  templateUrl: './rooms-list-out.component.html',
  styleUrls: ['./rooms-list-out.component.css']
})
export class RoomsListOutComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  rooms: any[] = [];
  filteredRooms: any[] = [];
  subscription: Subscription = new Subscription();
  currentShoppingCartRooms: any[] = [];
  ownedRooms: any[] = [];

  constructor(
    private serviceCategorie: CategoryService,
    private serviceRoom: RoomService,
    private serviceShoppingCart: ShoppingBasketService,
    private router: Router,
    private sweetService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.serviceCategorie
      .getAllRoomsCategories()
      .pipe(
        mergeMap((categories) =>
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
        console.log(categories);
        this.categories = categories;
        console.log(rooms);
        this.rooms = rooms;
        console.log(currentAddedRoomsInTheShoppingCart);
        this.currentShoppingCartRooms = currentAddedRoomsInTheShoppingCart;

        if (this.currentShoppingCartRooms.length === 1) {
          const text = `<h2> You cannot reserve the same room for another period until you have completed the current purchase!
            </h2>`;
          this.sweetService.alertMessage(text)
        }
      });
  }
  getRoomsByCategorie(key: any): any {
    return this.rooms.filter((room) => room.category === key);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  existItemInBasket(key: any): boolean {
    return this.currentShoppingCartRooms.find((room: any) => room.key === key);
  }
  DeleteToCart(room: { key: any }): void {
    this.serviceRoom.deleteRoomShoppingCart(room.key);
  }

  RoomExistenceById(key: any): boolean {
    return this.ownedRooms.find((room: any) => room.key === key);
  }

  goToRoom(key: any): void {
    this.router.navigate(['/room-out-content', key]);
  }
}
