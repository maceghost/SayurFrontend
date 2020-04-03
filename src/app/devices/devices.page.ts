import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { PopupService } from '../providers/popup.service';

import { DataService } from '../providers/data.service';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { SearchPipe } from '../../pipes/search/search';
// import { DeviceViewComponent } from '../components/device-view/device-view.component';
// import { ControllerViewPage } from '../components/controller-view/controller-view.component';
import { DeviceItemViewComponent } from '../components/device-item-view/device-item-view.component';
import { ControllerSocketViewComponent } from '../components/controller-socket-view/controller-socket-view.component';
import { NameComponent } from '../components/name/name.component';

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Routes, Router, RouterModule } from '@angular/router';





@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  providers: [SearchPipe]
})
export class DevicesPage implements OnInit {

  @ViewChildren('deviceItem') deviceItems:QueryList<DeviceItemViewComponent>;
  @ViewChild('controllerSocket') controllerSocketView;

  // deviceItems:any;
  controllerExpanded:any = null;
  deviceExpanded:any = null;
  deviceQueryTxt:string;
  deviceQueryChanged: Subject<string> = new Subject<string>();
  controllerQueryTxt:string;
  controllerQueryChanged: Subject<string> = new Subject<string>();

  devices:any [];
  controllers:any [];
  controllerTypes:any [];
  adding = false;
  placeholder = "Edit Name";
  selectedItem:any;
  selectedController:any;
  selectedDevice:any;
  controllerName:string;
  keyboard:any = false;
  conkeyboard:any = false;
  devkeyboard:any = false;



  constructor(
    public ds:DataService,
    public cdr: ChangeDetectorRef,
    public auth: AuthLocalProvider,
    public search: SearchPipe,
    public popup: PopupService,
    private router: Router

  ) {

    this.deviceQueryChanged
   .pipe(debounceTime(1000), distinctUntilChanged())
   .subscribe(model => {
       this.deviceQueryTxt = model;
       // api call
       console.log('deviceQueryTxt has changed : ',model);
       this.filterDevices();

   });

   this.controllerQueryChanged
  .pipe(debounceTime(1000), distinctUntilChanged())
  .subscribe(model => {
      this.controllerQueryTxt = model;
      // api call
      console.log('txtQuery has changed : ',model);
      this.filterControllers();

  });


  }

  func(keyboard:string){
    if(keyboard == 'controller' && !this.devkeyboard){
      this.conkeyboard = true

    }
    if(keyboard == 'device' && !this.conkeyboard){
      this.devkeyboard = true
    }
  }


  ngOnInit() {
     // this.filterDevices();
     // this.filterControllers();
     // this.getControllerTypes();
  }

  ionViewWillEnter() {
    this.filterDevices();
    this.filterControllers();

    this.getControllerTypes();
    this.auth.backButton = false;
    // this.reloadControllers();
  }
  myfun(){
    this.keyboard=true
    console.log('yo')
  }
  getCommPercentage(device) {
    let comm_rating = 10;
    if (device.comm_rating) {
      comm_rating = device.comm_rating;
    }
    return comm_rating * 10 + '%';
  }

  getControllerType(controller) {
      // if (controller.type == 'map_icon') {
      //   return 'MAP ICON';
      // }
      // if (controller.type == 'hvac') {
      //   return 'HVAC';
      // }
      // return 'UNKNOWN';
      let type = controller.type.toUpperCase().replace('_',' ');
      return type;
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

  collapseController() {
    this.controllerExpanded = null;
  }


  loadStatus(controller:any) {

    let nextPage = null;
    if ((controller.type == 'hvac' || controller.type == 'vpat4') && !this.auth.otherSensor(controller.name)){
      nextPage = '/tabs/home/hvac'
    }
    else if ( controller.type == 'light'){
      nextPage = '/tabs/home/light'

    }
    else{
      nextPage = '/tabs/home/map'

    }
    this.auth.lastUrl = this.router.url
    this.auth.currentUrl = nextPage
    this.auth.currentController = controller
    this.router.navigate([nextPage], { state: { back:true, controller:controller } });
    this.auth.backButton = true

    // const dialogConfig = new MatDialogConfig();
    //
    // dialogConfig.id = "modal-component";
    //
    // dialogConfig.data = {list:this.auth.location.controllers, view:this.myview}
    //
    // const modalDialog = this.dialog.open(ListSelectComponent, dialogConfig);
    // this.auth.pausesubs = true;
    //
    // modalDialog.afterClosed().subscribe(result => {
    //   console.log(result)
    //
    //   if (result){
    //
    //     let controller = result.data
    //     if (!controller.map_entries){
    //       controller.map_entries = []
    //
    //     }
    //     let pos = [0,0]
    //     let newentry = {pos:pos,name:this.myview}
    //     controller.map_entries.push(newentry)
    //
    //
    //     this.ds.update_controller_map_entry(controller._id.$oid, this.myview).then((data:any) => {
    //         console.log('set_controller_setting : '+ JSON.stringify(data));
    //         this.auth.resumeSubscriptions()
    //         console.log(controller)
    //
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     console.log(controller)
    //
    //
    //
    //
    //
    //
    //   }
    // });
  }

  filterControllers() {
    if (this.controllerQueryTxt) {
      this.controllers = this.search.transform(this.auth.location.controllers, this.controllerQueryTxt);
    } else {
      this.controllers = this.auth.location.controllers;
    }
    this.controllers = _.orderBy(this.controllers, ['ts'], ['desc']);
    return this.controllers
  }

  filterDevices() {
    if (this.deviceQueryTxt) {
      this.devices = this.search.transform(this.ds.devices, this.deviceQueryTxt);
    } else {
      this.devices = this.ds.devices;
    }
    return this.devices
  }

  expandController(controller) {
    console.log('expandController : ',controller._id.$oid);
    this.auth.registerKeypress();
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
    console.log('collapseDevice')
    this.deviceExpanded = null;
  }

  expandDevice(device) {
      console.log('expandDevice');
      this.auth.registerKeypress();
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
      // console.log('addSocketItem : '+this.controllerSocketView);
      console.log('socketing item for controller : '+JSON.stringify(cid)+' , '+JSON.stringify(itemid)+' , '+JSON.stringify(socketid));
      if (!this.alreadySocketed(socketid, itemid)) {
        this.ds.assign_controller_socket(cid, socketid, itemid).then(data => {
          // assign_controller_socket should return the new sockets...
          this.ds.get_sockets_by_controller_id(cid).then(sockets => {
              // let controller = JSON.parse(cdata);
              console.log('get_controller returned : '+JSON.stringify(sockets));
              // console.log('controllerExpanded sockets : '+JSON.stringify(this.controllerExpanded.sockets));
              this.controllerExpanded.sockets = sockets;
          }).catch(err =>{
              console.log('populateControllerSettings error : '+err);
          });
          this.ds.get_items_by_device_id(this.deviceExpanded.device_id).
            then((data) => {
                console.log('get_items_by_device_id : '+ JSON.stringify(data));
                this.deviceExpanded.items = data;
            }).catch((error) => {
              console.log(error);
            });

        }).catch((error)  => {
          console.log(error);
        });
      }
  }

  alreadySocketed(socketid, itemid):boolean {
    let socketed = false;
    // if (this.controllerSocketView) {
        for (let socket of this.controllerExpanded.sockets) {
            if (socket.code == socketid) {
                if (socket.item_id == itemid) {
                  console.log('item already socketed : '+JSON.stringify(socket));
                  socketed = true;
                  break;
                }
            }
        }
       // this.controllerSocket.controller = data;
       // this.controllerSocket.refresh();
    // }
    return socketed;
  }

  ejectSocket(cid, socketid) {
    console.log('ejecting socket item for controller : '+JSON.stringify(cid)+' , '+JSON.stringify(socketid));
    this.ds.clear_controller_socket(cid, socketid).then((data) => {
      console.log('clear_controller_socket : '+ JSON.stringify(data));
      this.ds.get_sockets_by_controller_id(cid).then(sockets => {
          // let controller = JSON.parse(cdata);
          console.log('get_controller returned : '+JSON.stringify(sockets));
          console.log('controllerExpanded sockets : '+JSON.stringify(this.controllerExpanded.sockets));
          this.controllerExpanded.sockets = sockets;
      }).catch(err =>{
          console.log('populateControllerSettings error : '+err);
      });
      this.ds.get_items_by_device_id(this.deviceExpanded.device_id).
        then((data) => {
            console.log('get_items_by_device_id : '+ JSON.stringify(data));
            this.deviceExpanded.items = data;
        }).catch((error) => {
          console.log(error);
        });

    }).catch((error)  => {
      console.log(error);
    });
  }

  getItemCount(itemid) {

  }

  refresh() {
     setTimeout(() => {
       console.log('DevicesPage');
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }, 100);
  }

  removeDevice(deviceId) {
    this.ds.remove_device(deviceId).
      then((data) => {
          console.log('remove_device : ',data);
          if (this.deviceExpanded) {
            delete this.deviceExpanded;
          }
          this.reloadControllers();

      }).catch((error) => {
        console.log(error);
      });
  }

  removeController(cid) {
    this.ds.remove_controller(cid).
      then((data) => {
          console.log('remove_device : ',data);
          if (this.controllerExpanded) {
            delete this.controllerExpanded;
          }
          this.reloadControllers();

      }).catch((error) => {
        console.log(error);
      });
  }

  addController() {
    console.log('addControler');
    this.popupCreateController();
    // this.getControllerTypes().then(() => {
    //
    // });
  }


  clearControllerFilter(){
    this.controllerQueryTxt = ''
  }

  clearDeviceFilter(){
    this.deviceQueryTxt = ''
  }

  onDeviceFilterChange(query:string){
    this.deviceQueryChanged.next(query);

  }

  onControllerFilterChange(query:string){
    console.log(query)
    this.controllerQueryChanged.next(query);
    console.log(this.controllerQueryTxt)
  }

  getControllerTypes() {
    // call ds.getControllerTypes
    // let promise = new Promise((resolve, reject) => {
      this.ds.get_controller_types().then((data:any) => {
        console.log('get_controller_types : '+ JSON.stringify(data));

        let type:any = {};
        this.controllerTypes = [];
        console.log(data)
        data.forEach((d) => {
            let ary = d.split(',');
            ary.forEach((v, idx) => {
              switch (idx % 3) {
                  case 0:
                    type = { name: v };
                    break;

                  case 1:
                    type.type = this.auth.formatName(v);
                    break;

                  case 2:
                    type.subtype = this.auth.formatName(v);;
                    type.combined = type.type+' - '+type.subtype;
                    this.controllerTypes.push(type);
                    console.log('adding type to controllerTypes : ',type);
                    break;

              }
            })
        });
        this.controllerTypes = _.orderBy(this.controllerTypes, ['type'], ['asc']);

        console.log(this.controllerTypes)

        // if (data.indexOf(",") != -1) {
				// 	var parts = data.split(',');
				// 	var cName = parts[0];
				// 	var cType = parts[1].toUpperCase().replace('_', ' ');
				// 	var cSubType = FormatHelper.titleCase(parts[2]);
				// 	addListItem({label:cType + " " + cSubType, data:cName});
				// }


        // this.controllerTypes = data;
        // resolve(data);
      }).catch((error) => {
        // reject();
        console.log(error);
      });
    // });
    // return promise;
  }

  popupCreateController() {
    // this.getControllerTypes().then(() => {
        this.adding = true;
    // });
  }

  close() {
    this.adding = false;
  }

  reloadControllers() {
    let map:any = {};
    map.fields =  ["name","type","subtype","enabled","status","map_entries","schedule","settings","modes"];
    map.sort = [["type",1],["subtype",1],["name",1]]
    this.ds.get_controllers(map).then((data) => {
      this.filterControllers();
      this.refresh();
    });
    // this.filterControllers();

  }

  // editName(event, controller) {
  //   console.log('editName called : ',controller);
  //   this.selectedItem = controller;
  //   event.stopPropagation();
  // }

  selectControllerType(value) {
    console.log('calling create_controller : ',value);

    // might want to include some creation of an object client side
    // as place holder until server responds

    this.ds.create_controller(value).then((data:any) => {
      console.log('create_controller : '+ JSON.stringify(data));
      this.adding = false;
      // this.controllerTypes = data;
      // this.ds.controllers.unshift( data );
      this.reloadControllers();
    }).catch((error) => {
      console.log(error);
    });
  }

  cancelItem() {
    delete this.selectedItem;
    delete this.selectedController;
  }

  updateItem() {
    let uid;
    let name = this.selectedItem.name;
    if (this.selectedController) {
      uid = this.selectedController._id.$oid;
      console.log('updateItem : ',name,this.selectedController.name)
      if (name != this.selectedController.name) {
          this.selectedController.name = name;
          this.ds.set_controller_name(uid, name).then((data) => {
              console.log('crontroller name updated : ',data)
          });
      }
    } else {
      uid = this.selectedDevice._id.$oid;
      console.log('updateItem : ',name,this.selectedDevice.name)
      if (name != this.selectedDevice.name) {
          this.selectedDevice.name = name;
          this.ds.set_device_name(uid, name).then((data) => {
              console.log('device name updated : ',data)
          });
      }
    }
    delete this.selectedItem;
    delete this.selectedController;
    delete this.selectedDevice;

  }

  async openControllerModal(controller, idx) {

    let componentInfo:any = {};
    componentInfo.component = NameComponent;
    componentInfo.cssClass = 'name-modal-css';
    // componentInfo.item = controller;
    // componentInfo.parent = this;
    this.selectedItem = _.cloneDeep(controller);
    componentInfo.componentProps = { item:this.selectedItem, parent: this };
    this.selectedController = controller;
    this.popup.openModal(componentInfo);

  }

  async openDeviceModal(device, idx) {

    let componentInfo:any = {};
    componentInfo.component = NameComponent;
    componentInfo.cssClass = 'name-modal-css';
    // componentInfo.item = controller;
    // componentInfo.parent = this;
    this.selectedItem = _.cloneDeep(device);
    componentInfo.componentProps = { item:this.selectedItem, parent: this };
    this.selectedDevice = device;
    this.popup.openModal(componentInfo);

  }


}
