import { Component } from '@angular/core';


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  page = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: 'assets/images/image1.jpg'
  };
  slides = [
    {img: 'assets/images/pool1.jpg' },
    {img: 'assets/images/room2.jpeg' },
    {img: 'assets/images/reception2.jpg' },
    {img: 'assets/images/mainbuilding1.jpg' },
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
  constructor() { }
  ngOnInit(): void {}


}
