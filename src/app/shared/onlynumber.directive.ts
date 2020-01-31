import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})

export class OnlyNumber {

  numberOnlyRegexStr = '^[0-9]*$';

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: string;

  @HostListener('keydown', ['$event']) onKeyDown(event: Event) {
    let e = <KeyboardEvent>event;
    if (this.OnlyNumber == "true" || this.OnlyNumber == "currency") {
      // Allow backspace, delete, tab, escape, enter
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow .
        this.OnlyNumber == "currency" && (e.keyCode == 110 || e.keyCode == 190) ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39) ||
        // Allow: command + a
        (e.keyCode == 65 && e.metaKey === true)) {
        // let it happen, don't do anything
        return;
      }

      let ch = String.fromCharCode(e.keyCode);
      let regEx = new RegExp(this.numberOnlyRegexStr);
      if (regEx.test(ch)) {
        //console.log("OnlyNumber - passed numbers only regex");
        return;
      } else {
        //console.log("OnlyNumber - failed numbers only regex");
        e.preventDefault();
      }
    } else {
      //console.log("OnlyNumber == '?'");
    }
  }
}