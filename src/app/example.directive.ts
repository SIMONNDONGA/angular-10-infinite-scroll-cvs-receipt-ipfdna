import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[attribute-directive]'
})
export class ExampleDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

}