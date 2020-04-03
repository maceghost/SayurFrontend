import { Component, OnInit, Input, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
// import { SocketedViewComponent } from '../socketed-view/socketed-view.component';
import { SocketedViewComponent } from '../socketed-view/socketed-view.component';

@Component({
  selector: 'app-device-item-view',
  templateUrl: './device-item-view.component.html',
  styleUrls: ['./device-item-view.component.scss']
})
export class DeviceItemViewComponent implements OnInit {

  @Input() parent;
  @Input() device;
  @ViewChildren('deviceItem') items:QueryList<SocketedViewComponent>;

  socketedImage = "/assets/images/device_item_bg_socketed.png";
  unsocketedImage = "/assets/images/device_item_bg_unsocketed.png";
  effectAllowed = "copy";

  constructor(private cdr:ChangeDetectorRef ) { }

  ngOnInit() {
    // console.log("device items : "+this.device.items);
    console.log("device items : "+this.items);
  }

  socketed(item) {
    let skd = false;
    if (item.usage && item.usage.length > 0) {
        skd = true;
    }
    return skd;
  }

  socketCount(item) {
    let count = 0;
    if (item.usage) {
        count = item.usage.length;
    }
    return count;
  }

  dragStarted($event) {
      console.log('dragStarted : '+$event);
  }

  dragEnded($event) {
    console.log('dragEnded : '+$event);
  }

  dragEntered($event) {
    console.log('dragEntered : '+$event);
  }
  dragExited($event) {
    console.log('dragExited : '+$event);
  }

  onDragStart(event:DragEvent) {
    console.log('onDragStart : '+JSON.stringify(event));
  }
  onDraggableCopied(event:DragEvent) {
    // console.log('onDraggableCopied : '+$event);
    console.log('onDraggableCopied : '+JSON.stringify(event));
  }
  onDraggableLinked(event:DragEvent) {
    console.log('onDraggableLinked : '+event);
  }
  onDraggableMoved($event) {
    console.log('onDraggableMoved : '+$event);
  }
  onDragCanceled($event) {
    console.log('onDragCanceled : '+$event);
  }

  onDragEnd($event) {
    console.log('onDragEnd : '+$event);
  }

  getDeviceTitle() {
     if (this.device.name) {
       return this.device.name;
     } else {
       return this.device.device_id;
     }
  }
  trashDevice(device:any) {
    // console.log('trashSocket : socket : '+JSON.stringify(device));
    this.parent.removeDevice(device._id.$oid);
  }

  loadSettings(device:any) {
    console.log('loadSettings : socket : '+JSON.stringify(device));
  }

  closeDevice() {
      this.parent.collapseDevice();
  }

  getItemValue(item) {
    let value = 0;
    if (item.value) {
      item.value.toFixed(2);
    }
    return value;
  }

  getItemRawValue(item) {
    let raw_value = "0.0";
    if (item.raw_value) {
       raw_value = parseFloat(item.raw_value).toFixed(2);
    }
    return raw_value;
  }

  getInternalId(item) {
    return parseInt(item.internal_id);
  }

  refresh() {
     setTimeout(() => {
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }, 100);
  }

  refreshItem(code) {
    let itemList: SocketedViewComponent[] = this.items.toArray();
    console.log('ControllerSocketViewComponent.refresh '+code+' , '+itemList.length);
    for (let item of itemList) {
        if (item['code'] == code) {
            item.refresh();
        }
    }
  }

}
