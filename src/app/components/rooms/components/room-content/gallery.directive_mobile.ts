import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGalleryMobile]',
})
// attribute Directive
export class GalleryMobileDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  imageChange(): any {
    const src: any = this.el.nativeElement.src;

    const prev: any = document.getElementById('preview2');

    prev.src = src;

    const imageSlide = document.getElementsByClassName('img-slide-mobile');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < imageSlide.length; i++) {
      imageSlide[i].classList.remove('active-mobile');
    }
    this.el.nativeElement.parentElement.classList.add('active-mobile');
  }
}
