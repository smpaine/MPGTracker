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
      //console.debug('key [' + e.key + '] meta [' + e.metaKey + '] ctrl [' + e.ctrlKey + ']');

      // Allow backspace, delete, tab, escape, enter
      if (['Delete', 'Backspace', 'Tab', 'Escape', 'Enter'].indexOf(e.key) !== -1 ||
        // Allow .
        this.OnlyNumber == "currency" && e.key == '.' ||
        // Allow: Ctrl+A/command+A
        ((e.ctrlKey || e.metaKey) && (e.key == 'a' || e.key == 'A')) ||
        // Allow: Ctrl+C/command+C
        ((e.ctrlKey || e.metaKey) && (e.key == 'c' || e.key == 'C')) ||
        // Allow: Ctrl+V/command+V
        ((e.ctrlKey || e.metaKey) && (e.key == 'v' || e.key == 'V')) ||
        // Allow: Ctrl+X/command+X
        ((e.ctrlKey || e.metaKey) && (e.key == 'x' || e.key == 'X')) ||
        // Allow: home, end, left, right
        (e.key == 'Home' || e.key == 'End' || e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
        // let it happen, don't do anything
        //console.debug('allowing keypress');
        return;
      }

      let ch = e.key;
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