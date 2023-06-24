import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/components/rooms/services/category.service';
import { Room } from '../../models/model.room';
import { RoomService } from '../../services/room.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  regiForm: any;
  categories: any[] = [];
  room: any;
  constructor(
    private fb: FormBuilder,
    private serviceCategorie: CategoryService,
    private serviceRoom: RoomService,
    private sweetService: SweetAlertService,
    public dialogRef: MatDialogRef<RoomFormComponent>,
    // MAT_DIALOG_DATA opens a modal dialog containing the given component
    @Inject(MAT_DIALOG_DATA) public roomId: any
  ) {}

  ngOnInit(): void {
    if (!this.roomId) {
      this.serviceCategorie.getAllRoomsCategories().subscribe((categories) => {
        this.categories = categories;
        this.initalizeRoom(null as any);
      });
    } else {
      this.serviceCategorie
        .getAllRoomsCategories()
        .pipe(
          mergeMap((categories) =>
            this.serviceRoom.getRoombyId(this.roomId.id).pipe(
              map((room) => {
                return [categories, room];
              })
            )
          )
        )
        .subscribe(([categories, room]) => {
          this.categories = categories as any[];
          this.room = room as Room;
          this.initalizeRoom(room);
        });
    }
  }

  initalizeRoom(room: {
    number: any;
    description: any;
    price: any;
    urlImage1: any;
    urlImage2: any;
    urlImage3: any;
    urlImage4: any;
    category: any;
    amenities: any;
    title: any;
  }): void {
    this.regiForm = this.fb.group({
      Number: [room ? room.number : null, Validators.required],
      Description: [room ? room.description : null, Validators.required],
      Price: [room ? room.price : null, Validators.required],
      UrlImage1: [room ? room.urlImage1 : null, Validators.required],
      UrlImage2: [room ? room.urlImage2 : null, Validators.required],
      UrlImage3: [room ? room.urlImage3 : null, Validators.required],
      UrlImage4: [room ? room.urlImage4 : null, Validators.required],
      Category: [room ? room.category : null, Validators.required],
      Amenities: [room ? room.amenities : null, Validators.required],
      Title: [room ? room.title : null, Validators.required]
    });
  }

  onSubmit(form: {
    Number: any;
    Description: any;
    Category: any;
    Price: any;
    UrlImage1: any;
    UrlImage2: any;
    UrlImage3: any;
    UrlImage4: any;
    Amenities: any;
    Title: any;
  }): void {
    if (this.regiForm.valid) {
      const room: Room = {
        id: this.roomId ? this.roomId.id : '',
        number: form.Number,
        description: form.Description,
        category: form.Category,
        price: form.Price,
        urlImage1: form.UrlImage1,
        urlImage2: form.UrlImage2,
        urlImage3: form.UrlImage3,
        amenities: form.Amenities,
        title: form.Title,
        urlImage4: form.UrlImage4
      };
      if (!this.roomId) {
        this.serviceRoom.createRoom(room).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage( `<h2>You successfully added a new Room</h2>`)
        });
      } else {
        this.serviceRoom.updateRoom(room).then(() => {
          this.dialogRef.close();
          this.sweetService.alertMessage(`<h2>You successfully edited this Room</h2>`)
        });
      }
    }
  }
}
