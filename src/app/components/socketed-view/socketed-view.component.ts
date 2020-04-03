import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
const SImage = "/assets/images/green_socket.png";
const USImage = "/assets/images/grey_socket.png";

@Component({
  selector: 'app-socketed-view',
  templateUrl: './socketed-view.component.html',
  styleUrls: ['./socketed-view.component.scss']
})
export class SocketedViewComponent implements OnInit {

  @Input() item;
  count:number;
  socketImage;

  constructor(private cdr:ChangeDetectorRef) { }

  // sImage = "/assets/images/green_socket.png";
  // usImage = "/assets/images/grey_socket.png";
  update(nuItem) {
      this.item = nuItem;
      this.setupView();
  }

  ngOnInit() {
    // console.log('SocketedViewComponent - item : '+this.item);
    // console.log('SocketedViewComponent - count : '+this.count+' , image : '+this.socketImage);
    this.setupView();
  }

  setupView() {
    this.count = 0;
    this.socketImage = USImage;
    if (this.item) {
      if (this.item.usage) {
        console.log('SocketedViewComponent - item : '+JSON.stringify(this.item.usage));
      }
      if (this.item && this.item.usage && this.item.usage.length > 0) {
          this.count =  this.item.usage.length;
      }
      if (this.count > 0) {
         this.socketImage = SImage;
      }
    }
  }

  debugItem() {
    console.log('socketedView item : ',this.item);
  }

  getItemInfo() {
      let info = JSON.stringify(this.item);
      return info;
  }

  refresh() {
     this.setupView();
     setTimeout(() => {
       console.log('ControllerSocketViewComponent.refresh()');
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }, 500);
  }
}
