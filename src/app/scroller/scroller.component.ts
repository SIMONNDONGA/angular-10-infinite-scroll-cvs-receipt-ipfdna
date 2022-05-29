import { Component, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'scroller',
    templateUrl: './scroller.component.html',
    styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent {

    @Input()
    loading = false;

    @Input()
    ended = false;

    @Input()
    height = '100%';

    @Output()
    onBottom = new EventEmitter();

    @Output()
    onTop = new EventEmitter();

    constructor(private el: ElementRef) { }

    @HostListener('scroll', ['$event']) // avoid @Hostlistener 
      onScroll(event) {
        if (this.loading || this.ended)
          return;
          const { scrollTop, offsetHeight, scrollHeight } = this.el.nativeElement;
        if (scrollTop === 0) {
          this.onTop.emit(event);
        } else if ((scrollTop + offsetHeight) === scrollHeight) {
          this.onBottom.emit(event);
        }
      }

    public get nativeElement() {
      return this.el.nativeElement as HTMLElement;
    }

    public scrollToY(top: number) {
      this.nativeElement.scrollTo({
        top,
        behavior: 'auto'
      });
    }

    public scrollToBottom() {
      this.nativeElement.scrollTo({
          top: this.scrollHeight,
          behavior: 'smooth'
      });
    }

    public get scrollHeight() {
      return this.nativeElement.scrollHeight;
    }
}
