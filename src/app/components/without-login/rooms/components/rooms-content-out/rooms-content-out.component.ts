import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-rooms-content-out',
  templateUrl: './rooms-content-out.component.html',
  styleUrls: ['./rooms-content-out.component.css']
})
export class RoomsContentOutComponent implements OnInit {
  controllerSrc: any;
  categories: any[] = [];
  roomId: any;
  currentUser: any;
  room: any = {};
  minDate: Date = new Date(Date.now());
  amenities: any = [];

  slides: any = [];
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  slickInit(e: any) {
    console.log('slick initialized');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  constructor(
    private router: ActivatedRoute,
    private routerNavigation: Router,
    private serviceRoom: RoomService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sweetService: SweetAlertService
  ) {}

  UnavailableDays: Date[] = [];

  myForm: any = this.formBuilder.group({});

  ngOnInit(): void {
    this.amenities = [ {
      title: "Air conditioner",
      icon: "fal fa-bath"
  },
  {
      title: "High speed WiFi",
      icon: "fal fa-wifi"
  }]
    this.roomId = this.router.snapshot.params['id'];

    this.serviceRoom.getRoombyId(this.roomId).subscribe((res) => {
      this.room = res;
      this.room.number = this.room.number.toUpperCase();
      this.room.category = this.room.category.toUpperCase();

      this.slides = [
        {img: this.room.urlImage1 },
        {img: this.room.urlImage2 },
        {img: this.room.urlImage3 },
        {img: this.room.urlImage4 }
      ]
    });

    this.myForm = this.formBuilder.group({
      date: ['', Validators.required],
    });

    this.serviceRoom.getReservedDays(this.roomId).subscribe((res: any) => {
      this.UnavailableDays = res;
    });

    this.loginService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      if (res === null) {
        this.sweetService.alertMessage(`<h2> You must be logged in to make a reservation </h2>`)
      }
    });
  }

  backToRooms(): void {
    this.routerNavigation.navigate(['/rooms-out']);
  }

  userState(): boolean {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }


  unavailableDays: DateFilterFn<Date | null> = (date: Date | null) => {
    const time = date?.getTime();
    return !this.UnavailableDays.find((x) => new Date(x).getTime() === time);

    // tslint:disable-next-line:semicolon
  };

  formatDate(date: Date): string {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${month}/${day}/${year}`;
  }

  submitReservation(): any {
    this.serviceRoom.getRoomWithKey(this.roomId).subscribe((room: any) => {
      const newAttribute: any = this.formatDate(this.myForm.value.date);
      const RoomWithDate: any = {
        key: room.key as any,
        category: room.category,
        description: room.description,
        price: room.price,
        number: room.number,
        urlImage1: room.urlImage1,
        urlImage2: room.urlImage2,
        urlImage3: room.urlImage3,
        urlImage4: room.urlImage4,
        reservationDay: newAttribute,
      };
      this.sweetService.alertMessage('Day ' + RoomWithDate.reservationDay + ' selected')

      this.serviceRoom.addInBasket(RoomWithDate);
    });

    this.routerNavigation.navigate(['/orders']);
  }
}
