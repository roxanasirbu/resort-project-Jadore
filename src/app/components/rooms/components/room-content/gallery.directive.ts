import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGallery]',
})
export class GalleryDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  imageChange(): any {
    const src: any = this.el.nativeElement.src;

    const prev: any = document.getElementById('preview');

    prev.src = src;

    const imageSlide = document.getElementsByClassName('img-slide');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < imageSlide.length; i++) {
      imageSlide[i].classList.remove('active');
    }
    this.el.nativeElement.parentElement.classList.add('active');
  }
}
