import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';

import { HallService } from '../../services/halls.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-hall-detail',
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.css']
})
export class HallDetailComponent implements OnInit {
  controllerSrc: any;
  categories: any[] = [];
  itemId: any;
  currentUser: any;
  item: any = {};

  minDate: Date = new Date(Date.now());

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
    private serviceHall: HallService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private sweetService: SweetAlertService
  ) {}

  UnavailableDays: Date[] = [];

  myForm: any = this.formBuilder.group({});

  ngOnInit(): void {
    this.itemId = this.router.snapshot.params['id'];

    this.serviceHall.getItembyId(this.itemId).subscribe((res) => {
      this.item = res;
     // this.item.number = this.item.number.toUpperCase();
      this.item.category = this.item.category.toUpperCase();

      this.slides = [
        {img: this.item.urlImage1 },
        {img: this.item.urlImage2 },
        {img: this.item.urlImage3 },
        {img: this.item.urlImage4 },
        {img: this.item.urlImage5 }
      ]
    });

    this.myForm = this.formBuilder.group({
      date: ['', Validators.required],
    });

    this.serviceHall.getReservedDays(this.itemId).subscribe((res: any) => {
      this.UnavailableDays = res;
    });

    this.loginService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      if (res === null) {
        this.sweetService.alertMessage(`<h2> You must be logged in to make a reservation </h2>`)
      }
    });
  }

  backToHalls(): void {
    this.routerNavigation.navigate(['/halls']);
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
    this.serviceHall.getItemWithKey(this.itemId).subscribe((item: any) => {
      const newAttribute: any = this.formatDate(this.myForm.value.date);
      const RoomWithDate: any = {
        key: item.key as any,
        category: item.category,
        description: item.description,
        number: item.number,
        urlImage1: item.urlImage1,
        urlImage2: item.urlImage2,
        urlImage3: item.urlImage3,
        reservationDay: newAttribute,
        price: item.price,
        title: item.title
      };
      this.sweetService.alertMessage( 'Day ' + RoomWithDate.reservationDay + ' selected');
      this.serviceHall.addInBasket(RoomWithDate);
    });

    this.routerNavigation.navigate(['/orders']);
  }
}
