import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  description:  any;
  slides = [
    {img: 'assets/images/pool2.jpg' },
    {img: 'assets/images/room2.jpeg' },
    {img: 'assets/images/reception2.jpg' },
    {img: 'assets/images/restaurant1.jpg' },
    {img: 'assets/images/pool2.jpg' },
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
  constructor(private loginService: LoginService, private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loginService.getUserAuth().subscribe((res) => {
      this.user = res;
    });
    this.description = `<strong> Jadore Hotel is a luxurious accommodation, Jadore offers guests a delightful experience that combines style and comfort. </strong> <br/> With its prime location, it offers easy access to various attractions, making it an ideal choice for both leisure and business travelers.  <br/> The hotel boasts a range of luxurious rooms and suites, designed with contemporary decor and modern amenities to provide guests with a comfortable and relaxing stay. The rooms are spacious and offer stunning views of the city skyline, while the suites offer additional features such as private balconies and Jacuzzis.  <br/> In addition to its accommodations, Jadore Hotel also features an upscale restaurant that serves a range of delectable cuisines, prepared by experienced chefs using only the freshest ingredients. The restaurant offers an elegant ambiance and attentive service, making it an ideal spot for romantic dinners or business lunches.  <br/> For those looking to host events, Jadore has a selection of event halls that can accommodate a range of functions, from intimate meetings to large-scale conferences and weddings. The halls are equipped with state-of-the-art technology and can be customized to meet specific requirements, making it a top choice for event planners.  <br/> Whether you are visiting for business or leisure, Jadore Hotel offers an unforgettable experience with its luxurious accommodations, delectable cuisine, and excellent event facilities.`
  }
  googleLoginMethod(): void {
    this.loginService.loginWithGoogle();
  }

  checkRooms(): void {
    this.router.navigate(['/rooms']);
  }
  checkHalls(): void {
    this.router.navigate(['/halls']);
  }

  translateIn(lang: string): any {
    this.translate.use(lang);
  }
}
