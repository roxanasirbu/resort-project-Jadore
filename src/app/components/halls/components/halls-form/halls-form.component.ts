import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, mergeMap } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { Hall } from '../../model/hall-model';
import { HallService } from '../../services/halls.service';
import { CategoryHallService } from '../../services/category-hall.service';

@Component({
  selector: 'app-halls-form',
  templateUrl: './halls-form.component.html',
  styleUrls: ['./halls-form.component.css']
})
export class HallsFormComponent implements OnInit {
  regiForm: any;
  categories: any[] = [];
  item: any;
  constructor(
    private fb: FormBuilder,
    private serviceCategorie: CategoryHallService,
    private hallsService: HallService,
    private sweetService: SweetAlertService,
    public dialogRef: MatDialogRef<HallsFormComponent>,
    // MAT_DIALOG_DATA opens a modal dialog containing the given component
    @Inject(MAT_DIALOG_DATA) public itemId: any
  ) {}

  ngOnInit(): void {
    if (!this.itemId) {
      this.serviceCategorie.getAllCategories().subscribe((categories) => {
        this.categories = categories;
        this.initalizeItem(null as any);
      });
    } else {
      this.serviceCategorie
        .getAllCategories()
        .pipe(
          mergeMap((categories) =>
            this.hallsService.getItembyId(this.itemId.id).pipe(
              map((item) => {
                return [categories, item];
              })
            )
          )
        )
        .subscribe(([categories, item]) => {
          this.categories = categories as any[];
          this.item = item as Hall;
          this.initalizeItem(item);
        });
    }
  }

  initalizeItem(item: {
    number: any;
    description: any;
    urlImage1: any;
    urlImage2: any;
    urlImage3: any;
    urlImage4: any;
    urlImage5: any;
    category: any;
    price : any;
    title: any;
  }): void {
    this.regiForm = this.fb.group({
      Number: [item ? item.number : null, Validators.required],
      Description: [item ? item.description : null, Validators.required],
      UrlImage1: [item ? item.urlImage1 : null, Validators.required],
      UrlImage2: [item ? item.urlImage2 : null, Validators.required],
      UrlImage3: [item ? item.urlImage3 : null, Validators.required],
      UrlImage4: [item ? item.urlImage4 : null, Validators.required],
      UrlImage5: [item ? item.urlImage5 : null, Validators.required],
      Category: [item ? item.category : null, Validators.required],
      Price: [item ? item.price : null, Validators.required],
      Title: [item ? item.title : null, Validators.required]
    });
  }

  onSubmit(form: {
    Number: any;
    Description: any;
    Category: any;
    UrlImage1: any;
    UrlImage2: any;
    UrlImage3: any;
    UrlImage4: any;
    UrlImage5: any;
    Price: any;
    Title: any
  }): void {
    if (this.regiForm.valid) {
      const item: Hall = {
        id: this.itemId ? this.itemId.id : '',
        number: form.Number,
        description: form.Description,
        category: form.Category,
        urlImage1: form.UrlImage1,
        urlImage2: form.UrlImage2,
        urlImage3: form.UrlImage3,
        urlImage4: form.UrlImage4,
        urlImage5: form.UrlImage5,
        price: form.Price,
        title: form.Title
      };
      if (!this.itemId) {
        this.hallsService.AddItem(item).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage( `<h2>You successfully added a new Ballroomm</h2>`)
        });
      } else {
        this.hallsService.updateItem(item).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage(`<h2>You successfully edited this Ballroom</h2>`)
        });
      }
    }
  }
}
