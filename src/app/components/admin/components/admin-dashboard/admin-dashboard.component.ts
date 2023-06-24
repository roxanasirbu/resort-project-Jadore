import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { RoomFormComponent } from 'src/app/components/rooms/components/room-form/room-form.component'; 
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { RestaurantFormComponent } from 'src/app/components/restaurant/components/restaurant-form/restaurant-form.component';
import { RestaurantService } from 'src/app/components/restaurant/services/restaurant.service';
import { HallService } from 'src/app/components/halls/services/halls.service';
import { HallsFormComponent } from 'src/app/components/halls/components/halls-form/halls-form.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  rooms: any[] = [];
  displayedColumns: string[] = ['number', 'category', 'price', 'actions'];
  items: any[] = [];
  halls: any[] = [];

  slides: any = [ {img: 'assets/images/j1.jpg'},
  {img: 'assets/images/j2.jpg'},
  {img: 'assets/images/j3.jpg'},
  ];
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
    private serviceRoom: RoomService,
    private serviceDialog: MatDialog,
    private sweetService: SweetAlertService,
    public authService: LoginService,
    private serviceRestaurant: RestaurantService,
    private serviceHall: HallService,
  ) {}

  ngOnInit(): void {
    this.serviceRoom
      .getAllRooms()
      .subscribe((rooms: any[]) => (this.rooms = rooms));
    
      this.serviceRestaurant
      .getAllItems()
      .subscribe((items: any[]) => (this.items = items));

      this.serviceHall
      .getAllItems()
      .subscribe((halls: any[]) => (this.halls = halls));
  }
  
  
  createRoom(): void {
    const dialogRef = this.serviceDialog.open(RoomFormComponent, {
      width: '650px',
    });
  }
  

  AddItem(): void {
    const dialogRef = this.serviceDialog.open(RestaurantFormComponent, {
      width: '650px',
    });
  }
 

  AddHall(): void {
    const dialogRef = this.serviceDialog.open(HallsFormComponent, {
      width: '650px',
    });
  }


  onLogout() {
    this.authService.logout();
  }
}

