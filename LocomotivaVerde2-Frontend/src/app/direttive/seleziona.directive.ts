import { Directive, ElementRef, HostListener   } from '@angular/core';

@Directive({
  selector: '[appSeleziona]'
})
export class SelezionaDirective {

  constructor(public el: ElementRef) {}

  // tslint:disable-next-line: typedef
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('grey');
  }
  // tslint:disable-next-line: typedef
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  // tslint:disable-next-line: typedef
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
