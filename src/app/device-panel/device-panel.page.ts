import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component'
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { DataService } from '../providers/data.service'
// import { DeviceItemViewComponent } from '../device-item-view/device-item-view.component'
// import { ControllerSocketViewComponent } from '../controller-socket-view/controller-socket-view.component';
// import { ControllerViewPage } from '../components/controller-view/controller-view.page';
// import { DeviceViewComponent } from '../components/device-view/device-view.component';
import { DeviceViewComponent } from '../components/device-view/device-view.component';

@Component({
  selector: 'device-panel-page',
  templateUrl: 'device-panel.page.html',
  styleUrls: ['device-panel.page.scss'],
})
export class DevicePanelPage implements OnInit {


  @Input() parent:any;
  @ViewChild('deviceView') deviceView:any;

  devices = [];

  controllers = [];

  deviceItems:any;
  controllerExpanded:any = null;
  deviceExpanded:any = null;

  constructor(
    // public auth:AuthLocalProvider,
    public ds:DataService
  ) {
    console.log('DevicePanelPage()');
  }

  ngOnInit() {
    console.log('device-panel page init()');
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
    this.controllerExpanded = null;
  }

  expandController(controller) {
    this.ds.get_sockets_by_controller_id(controller._id.$oid).then((data:any) => {
      console.log('get_sockets_by_controller_id : '+ JSON.stringify(data));
      controller.sockets = data;
      this.controllerExpanded = controller;
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
    this.deviceExpanded = null;
  }

  expandDevice(device) {
      this.deviceExpanded = device;
      this.ds.get_items_by_device_id(device.device_id).
        then((data) => {
        //               step.complete = true;
            console.log('get_items_by_device_id : '+ JSON.stringify(data));
            device.items = data;
        }).catch((error) => {
          console.log(error);
        });
  }

  addSocketItem(cid, socketid, itemid) {
      console.log('socketing item for controller : '+JSON.stringify(cid)+' , '+JSON.stringify(itemid)+' , '+JSON.stringify(socketid));
      this.ds.assign_controller_socket(cid, socketid, itemid).then((data) => {
        console.log('assign_controller_socket : '+ JSON.stringify(data));
      }).catch((error)  => {
        console.log(error);
      });
  }

  ejectSocket(cid, socketid) {

    console.log('ejecting socket item for controller : '+JSON.stringify(cid)+' , '+JSON.stringify(socketid));
    this.ds.clear_controller_socket(cid, socketid).then((data) => {
      console.log('clear_controller_socket : '+ JSON.stringify(data));
    }).catch((error)  => {
      console.log(error);
    });
  }

  getItemCount(itemid) {

  }


}
