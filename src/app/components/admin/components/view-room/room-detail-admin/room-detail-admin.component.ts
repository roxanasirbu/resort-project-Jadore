import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-room-detail-admin',
  templateUrl: './room-detail-admin.component.html',
  styleUrls: ['./room-detail-admin.component.css']
})
export class RoomDetailAdminComponent implements OnInit {
  controllerSrc: any;
  categories: any[] = [];
  roomId: any;
  currentUser: any;
  room: any = {};

  minDate: Date = new Date(Date.now());


  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  suggestions: any[] = [];
  suggestionsListed: any[] = [];

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
    private sanitizer: DomSanitizer,
    private sweetService: SweetAlertService
  ) {}

  UnavailableDays: Date[] = [];

  myForm: any = this.formBuilder.group({});
 

  ngOnInit(): void {
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
      date: ['', Validators.required]
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

   this.suggestions = [
    {
      "amenities": [
        {
          "icon": "fal fa-bath",
          "title": "Air conditioner"
        },
        {
          "icon": "fal fa-wifi",
          "title": "High speed WiFi"
        },
        {
          "icon": "fal fa-cut",
          "title": "Breakfast"
        },
        {
          "icon": "fal fa-broom",
          "title": "Cleaning"
        },
        {
          "icon": "fal fa-shower",
          "title": "Shower"
        },
        {
          "icon": "fal fa-headphones-alt",
          "title": "24/7 Online Support"
        },
        {
          "icon": "fal fa-shopping-cart",
          "title": "shop near"
        },
        {
          "icon": "fal fa-bus",
          "title": "Towels"
        }
      ],
      "category": "room",
      "description": "This spacious room is perfect for families. The room features a comfortable king-size bed and a separate area with another bed. The room has a large flat-screen TV and a cozy sitting area. The en-suite bathroom features a shower, a bathtub, and luxurious amenities.",
      "number": "1",
      "price": 23,
      "title": "Amber Star",
      "urlImage1": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/family.jpeg?alt=media&token=0733e943-2c42-43a7-8baa-fa92ae9ec562",
      "urlImage2": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/double.jpeg?alt=media&token=092a4d78-1aa1-4c2d-8ca7-b22a389a32b8",
      "urlImage3": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/bathroomf.jpeg?alt=media&token=a309cde4-5739-4109-b42b-beffce81e166",
      "urlImage4": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/double2.jpeg?alt=media&token=8ad92208-b8ac-44a3-9d6a-573dcbb545db"
    },
    {
      "amenities": [
        {
          "icon": "fal fa-bath",
          "title": "Air conditioner"
        },
        {
          "icon": "fal fa-wifi",
          "title": "High speed WiFi"
        },
        {
          "icon": "fal fa-cut",
          "title": "Breakfast"
        },
        {
          "icon": "fal fa-broom",
          "title": "Cleaning"
        },
        {
          "icon": "fal fa-shower",
          "title": "Shower"
        },
        {
          "icon": "fal fa-headphones-alt",
          "title": "24/7 Online Support"
        },
        {
          "icon": "fal fa-shopping-cart",
          "title": "shop near"
        },
        {
          "icon": "fal fa-bus",
          "title": "Towels"
        }
      ],
      "category": "room",
      "description": "This room features a comfortable king-size bed and a separate area for children. The room has a large window that provides natural light and a beautiful view of the surrounding area. The en-suite bathroom features a shower, a bathtub, and luxurious amenities.",
      "number": "2",
      "price": 19,
      "title": "Queen Room",
      "urlImage1": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/double.jpeg?alt=media&token=092a4d78-1aa1-4c2d-8ca7-b22a389a32b8",
      "urlImage2": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/family.jpeg?alt=media&token=0733e943-2c42-43a7-8baa-fa92ae9ec562",
      "urlImage3": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/bathroomf.jpeg?alt=media&token=a309cde4-5739-4109-b42b-beffce81e166",
      "urlImage4": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/double2.jpeg?alt=media&token=8ad92208-b8ac-44a3-9d6a-573dcbb545db"
    }
   ];

   this.suggestionsListed = [
    {
      "category": "main",
      "description": "Zucchini cream soup with croutons is a classic dish that is loved by many for its rich, creamy texture and fresh, vibrant flavor. This soup is the perfect starter or light meal that can be enjoyed throughout the year, especially during the colder months. To make the soup, fresh zucchini is diced and sautéed in a pan with garlic, onion, and a little bit of butter. ",
      "number": 2,
      "price": 15,
      "title": "Zucchini cream soup with croutons ",
      "urlImage1": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/ciorba.jpg?alt=media&token=75567acd-c194-4c17-97fe-ffd6624b79ed"
    },
    {
      "category": "main",
      "description": "Our chicken breast with pan-fried vegetables and rice is a delicious and healthy meal that is perfect for anyone looking for a nutritious and satisfying lunch or dinner. This dish features a juicy and tender chicken breast that has been grilled to perfection, with a crispy exterior and a juicy, flavorful interior. To accompany the chicken breast, we serve a colorful medley of pan-fried vegetables, including zucchini, bell peppers, carrots, and onions. ",
      "number": 5,
      "price": 12,
      "title": "Chicken breast with pan-fried vegetables and rice ",
      "urlImage1": "https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/fel2.jpg?alt=media&token=a080472a-8e7d-488c-be57-d415ff8ffafb"
    },
   ]

  }


  backToRooms(): void {
    this.routerNavigation.navigate(['/admin-v-room']);
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
        amenities: room.amenities,
        title: room.title
      };
      this.sweetService.alertMessage( 'Day ' + RoomWithDate.reservationDay + ' selected');
      this.serviceRoom.addInBasket(RoomWithDate);
    });

    this.routerNavigation.navigate(['/orders-a']);
  }

  goToRoom(key: any): void {
    this.routerNavigation.navigate(['/admin-v-room-co', key]);
  }

 
}

