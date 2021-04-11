import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // Option1: Close menu when clicking a menu-button
  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }

  /*Option1: Close menu when clicking anywhere outside*/
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  /* "private elRef: ElementRef" - will also create a class variable*/
  constructor(private elRef: ElementRef) {}
}
