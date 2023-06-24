import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RestaurantService } from 'src/app/components/restaurant/services/restaurant.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { CategoryRestaurantService } from 'src/app/components/restaurant/services/category-restaurant.service';

@Component({
  selector: 'app-restaurant-list-out',
  templateUrl: './restaurant-list-out.component.html',
  styleUrls: ['./restaurant-list-out.component.css']
})
export class RestaurantListOutComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  items: any[] = [];
  subscription: Subscription = new Subscription();
  ownedItems: any[] = [];

  constructor(
    private serviceCategorie: CategoryRestaurantService,
    private restaurantService: RestaurantService,

  ) {}

  ngOnInit(): void {
    this.subscription = this.serviceCategorie
      .getAllRestaurantCategories()
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
        this.categories = categories;
        this.items = items;
       
      });
  
  }
  getItemsByCategorie(key: any): any {
    return this.items.filter((item) => item.category === key);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  RoomExistenceById(key: any): boolean {
    return this.ownedItems.find((room: any) => room.key === key);
  }


}
