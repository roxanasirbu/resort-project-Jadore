import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HallService } from 'src/app/components/halls/services/halls.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { CategoryHallService } from 'src/app/components/halls/services/category-hall.service';

@Component({
  selector: 'app-halls-list-out',
  templateUrl: './halls-list-out.component.html',
  styleUrls: ['./halls-list.component.css']
})
export class HallsListOutComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  items: any[] = [];
  filteredRooms: any[] = [];
  subscription: Subscription = new Subscription();
  currentShoppingCartRooms: any[] = [];
  ownedRooms: any[] = [];

  constructor(
    private serviceCategorie: CategoryHallService,
    private restaurantService: HallService,

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
                map((items) => [
                      categories,
                      items
                    ])

            )
        )
      )
      .subscribe(([categories, items]) => {
        console.log(categories);
        this.categories = categories;
        console.log(items);
        this.items = items;
       
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
    this.router.navigate(['/hall-detail-out', key]);
  }
}
