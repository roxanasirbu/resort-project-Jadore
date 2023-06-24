import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RestaurantService } from '../../services/restaurant.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { CategoryRestaurantService } from '../../services/category-restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit, OnDestroy {
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
        console.log(categories);
        this.categories = categories;
        console.log(items);
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

