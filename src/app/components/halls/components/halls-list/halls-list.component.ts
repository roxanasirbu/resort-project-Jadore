import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HallService } from '../../services/halls.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { CategoryHallService } from '../../services/category-hall.service';
import { ShoppingBasketService } from 'src/app/components/basket/services/shopping-basket.service';

@Component({
  selector: 'app-halls-list',
  templateUrl: './halls-list.component.html',
  styleUrls: ['./halls-list.component.css']
})
export class HallsListComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  items: any[] = [];
  filteredRooms: any[] = [];
  subscription: Subscription = new Subscription();
  currentShoppingCartRooms: any[] = [];
  ownedRooms: any[] = [];

  constructor(
    private serviceCategorie: CategoryHallService,
    private restaurantService: HallService,
    private serviceShoppingCart: ShoppingBasketService,
    private router: Router,

    private sweetService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.serviceCategorie
      .getAllCategories()
      .pipe(
        mergeMap((categories) =>
          this.restaurantService
            .getAllItems()
            .pipe(
              mergeMap((items) =>
                this.serviceShoppingCart
                  .getListItemsShoppingCart()
                  .pipe(
                    map((currentAddedRoomsInTheShoppingCart) => [
                      categories,
                      items,
                      currentAddedRoomsInTheShoppingCart,
                    ])
                  )
              )
            )
        )
      )
      .subscribe(([categories, items, currentAddedRoomsInTheShoppingCart]) => {
      
        this.categories = categories;
       
        this.items = items;
        this.currentShoppingCartRooms = currentAddedRoomsInTheShoppingCart;
        if (this.currentShoppingCartRooms.length === 1) {
          const text = `<h2> You cannot reserve the same ballroom for another period until you have completed the current purchase!
            </h2>`;
   
          this.sweetService.alertMessage(text)
        }
      });
  
  }
  getRoomsByCategorie(key: any): any {
    return this.items.filter((item) => item.category === key);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  existItemInBasket(key: any): boolean {
    return this.currentShoppingCartRooms.find((room: any) => room.key === key);
  }
  DeleteToCart(room: { key: any }): void {
    this.restaurantService.deleteRoomShoppingCart(room.key);
  }

  RoomExistenceById(key: any): boolean {
    return this.ownedRooms.find((room: any) => room.key === key);
  }

  AccessHall(key: any): void {
    this.router.navigate(['/hall-content', key]);
  }
}
