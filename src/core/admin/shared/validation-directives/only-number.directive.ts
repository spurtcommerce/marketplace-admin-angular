/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  public regex: RegExp;
  private specialKeys: any = ['Backspace', 'Tab', 'End', 'Home'];
  @Input() isDot: any;
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  KeyDown(event: KeyboardEvent) {
    if (this.isDot) {
      this.regex = new RegExp(/^[0-9]*\.?[0-9]*$/);
    } else {
      this.regex = new RegExp(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/);
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
