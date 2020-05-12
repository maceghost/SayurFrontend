import { Directive, ElementRef, HostListener,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSearchOffCLick]'
})
export class SearchOffCLickDirective {

  @Output() offClick = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    console.log(this._elementRef.nativeElement)
    console.log(targetElementPath)

    let elementRefInPath = targetElementPath.find(e => e === this._elementRef.nativeElement);
    if (!elementRefInPath) {
      this.offClick.emit(null);
    }
  }

}
