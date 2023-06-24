import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryRestaurantService } from '../../services/category-restaurant.service';
import { Restaurant } from '../../model/restaurant_model';
import { RestaurantService } from '../../services/restaurant.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  regiForm: any;
  categories: any[] = [];
  item: any;
  constructor(
    private fb: FormBuilder,
    private serviceCategorie: CategoryRestaurantService,
    private restaurantService: RestaurantService,
    private sweetService: SweetAlertService,
    public dialogRef: MatDialogRef<RestaurantFormComponent>,
    // MAT_DIALOG_DATA opens a modal dialog containing the given component
    @Inject(MAT_DIALOG_DATA) public itemId: any
  ) {}

  ngOnInit(): void {
    if (!this.itemId) {
      this.serviceCategorie.getAllRestaurantCategories().subscribe((categories) => {
        this.categories = categories;
        this.initalizeItem(null as any);
      });
    } else {
      this.serviceCategorie
        .getAllRestaurantCategories()
        .pipe(
          mergeMap((categories) =>
            this.restaurantService.getItembyId(this.itemId.id).pipe(
              map((item) => {
                return [categories, item];
              })
            )
          )
        )
        .subscribe(([categories, item]) => {
          this.categories = categories as any[];
          this.item = item as Restaurant;
          this.initalizeItem(item);
        });
    }
  }

  initalizeItem(item: {
    number: any;
    description: any;
    price: any;
    urlImage1: any;
    category: any;
    title: any;
  }): void {
    this.regiForm = this.fb.group({
      Number: [item ? item.number : null, Validators.required],
      Description: [item ? item.description : null, Validators.required],
      Price: [item ? item.price : null, Validators.required],
      UrlImage1: [item ? item.urlImage1 : null, Validators.required],
      Category: [item ? item.category : null, Validators.required],
      Title: [item ? item.title : null, Validators.required],
    });
  }

  onSubmit(form: {
    Number: any;
    Description: any;
    Category: any;
    Price: any;
    UrlImage1: any;
    Title: any;
  }): void {
    if (this.regiForm.valid) {
      const item: Restaurant = {
        id: this.itemId ? this.itemId.id : '',
        number: form.Number,
        description: form.Description,
        category: form.Category,
        price: form.Price,
        urlImage1: form.UrlImage1,
        title: form.Title
      };
      if (!this.itemId) {
        this.restaurantService.AddItem(item).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage( `<h2>You successfully added a new item in menu</h2>`)

        });
      } else {
        this.restaurantService.updateItem(item).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage(`<h2>You successfully edited this item from menu</h2>`)
        });
      }
    }
  }
}