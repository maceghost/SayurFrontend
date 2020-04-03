import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../providers/data.service'

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss'],
})
export class DeviceViewComponent implements OnInit {

  @Input('parent') parent:any;
  @Input('device') device:any;
  expanded = false;


  constructor(public ds:DataService) { }

  ngOnInit() {}

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  getCommPercentage(comm_rating) {
      return comm_rating * 10 + '%';
  }

  getControllerType(controller) {
      if (controller.type == 'map_icon') {
        return 'MAP ICON';
      }
      if (controller.type == 'hvac') {
        return 'HVAC';
      }
      return 'UNKNOWN';
  }

  getControllerSubtype(controller) {
      if (controller.type == 'standard') {
        return 'STANDARD';
      }
      if (controller.type == 'hvac') {
        return 'HVAC';
      }
      return 'UNKNOWN';
  }

  collapseController(controller) {
    this.expanded = null;
  }

  expandController(controller) {
    this.ds.get_sockets_by_controller_id(controller._id.$oid).then((data:any) => {
      console.log('get_sockets_by_controller_id : '+ JSON.stringify(data));
      controller.sockets = data;
      this.expanded = controller;
    }).catch((error) => {
        console.log(error);
    });
      //
      //
      //
      // for (let socket of controller.sockets) {
      //     if (socket.item_id) {
      //       this.ds.get_item_controller_usage(socket.item_id).
      //         then((data:any) => {
      //         //               step.complete = true;
      //             console.log('get_item_controller_usage : '+ JSON.stringify(data));
      //             socket.count = data.length;
      //         }).catch((error) => {
      //           console.log(error);
      //         });
      //
      //     }
      // }
  }

  collapseDevice(controller) {
    this.expanded = null;
  }

  expandDevice(device) {
      this.expanded = device;
      this.ds.get_items_by_device_id(device.device_id).
        then((data) => {
        //               step.complete = true;
            console.log('get_items_by_device_id : '+ JSON.stringify(data));
            device.items = data;
        }).catch((error) => {
          console.log(error);
        });
  }

}
