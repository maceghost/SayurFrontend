import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList  } from '@angular/core';
// import { IonApp, Router } from '@ionic'
import { IonicModule, ModalController } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { LightmodalComponent } from '../components/lightmodal/lightmodal.component';
import { PipesModule } from '../../pipes/pipes.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataService } from '../providers/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ListSelectComponent } from '../modals/list-select/list-select.component';
import { ListSelectionComponent } from '../components/list-selection/list-selection.component';
import { ListSelectorComponent } from '../components/list-selector/list-selector.component';
import {MatListModule} from '@angular/material/list';



import * as _ from 'lodash';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // constructor(private router: Router) { }
  //
  // ngOnInit() {
  // }

  openDetailsInTab() {
      this.router.navigateByUrl('/tabs/home/hvac');
  }

// }


// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

  filter: any = "all";
  locationName = "Unity Energy Solutions";
  pushPage: any = "LocationPage";
  type: any = "hvac";
  hvacpage: any = "HvacPage";
  lightpage: any = "LightPage";
  mapiconpage: any = "MapIconPage";
  modalopen:boolean = false;
  initialized = false;
  terms:any;
  myview:any;
  hvacsInView:any = true;

  coolersInView:any = true;

  lightsInView:any = true;

  sensorsInView:any = true;
  powerInView:any = true;
  addingControllers:any = false;

  hvacFilters = [

    { value:"all",notselected:"abtn",selected:"abtn selected", filter:"all", text:"ALL"},
    { value:"lightgreen", notselected:"gbtn",selected:"gbtn selected", filter:"lightgreen"},
    { value:"yellow", notselected:"ybtn", selected:"ybtn selected", filter:"#FEFE83"},
    { value:"red", notselected:"rbtn", selected:"rbtn selected", filter:"#F45151"},
    { value:"offline", notselected:"obtn", selected:"obtn selected", filter:"offline",
         image:"assets/img/icons8-offline-100.png" }
  ];
  freezerFilters = [
    { value:"all",notselected:"abtn",selected:"abtn selected", filter:"all", text:"ALL"},
    { value:"lightblue", notselected:"bbtn",selected:"bbtn selected", filter:"lightblue"},
    { value:"orange", notselected:"orangebtn", selected:"orangebtn selected", filter:"orange"},
    { value:"offline", notselected:"obtn", selected:"obtn selected", filter:"offline",
         image:"assets/img/icons8-offline-100.png" }

  ];
  lightFilters = [];


  mylocs: any = this.auth.locations;
  myloc: any = this.auth.location;
  removing:any=false;
  //
  // @ViewChildren('list') lists: QueryList<CdkDropList>;
  // listArray = [[{col: 4, text: 'one'}], [{col: 4, text: 'two'}], [{col: 4, text: 'two'}]];
  // private listsChecked: boolean = false;

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    // public navCtrl: NavController,
    public auth: AuthLocalProvider,
    public ds: DataService,


    public cdr: ChangeDetectorRef,
    public dialog: MatDialog) {

    console.log(this.ds.controllers)

    this.initialize();
    // for (let i of this.auth.location.map.pages)
    this.myview = this.auth.location.map.pages[0]
  }

  // ionViewDidLeave(){
  //   this.auth.location.timesubscription.unsubscribe()
  // }

  // isMaster(controller:any){
  //   if
  // }

  isOnMap(controller:any){
    if (controller.map_entries){
      for (let i of controller.map_entries){
        // if (i.name == this.data.view){
        //   return true
        // }
      }
    }

    return false
  }
  //
  // add(controller:any){
  //   this.dialogRef.close({event:'add',data:controller});
  // }


  removeFromMap(){

    this.removing = !this.removing

  }
  over(i){
    console.log(i)

  }

  addControllersBegin(){
    console.log(this.addingControllers)
    this.addingControllers = !this.addingControllers
  }

  addToMap(controller:any){
    this.addingControllers = false;
    this.auth.pausesubs = true;
    if (!controller.map_entries){
      controller.map_entries = []

    }

    let pos = [0,0]
    let newentry = {pos:pos,name:this.myview}
    controller.map_entries.push(newentry)


    this.ds.update_controller_map_entry(controller._id.$oid, this.myview).then((data:any) => {
        console.log('set_controller_setting : '+ JSON.stringify(data));
        this.auth.resumeSubscriptions()
        console.log(controller)

    }).catch((error) => {
        console.log(error);
    });
    console.log(controller)
  }
  addToMap1() {
    this.addingControllers = !this.addingControllers;


    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // for (let i of this.auth.location.controllers){
    //
    // }
    dialogConfig.data = {list:this.auth.location.controllers, view:this.myview}
    // dialogConfig.data.setting = this.setting

    const modalDialog = this.dialog.open(ListSelectComponent, dialogConfig);
    this.auth.pausesubs = true;

    modalDialog.afterClosed().subscribe(result => {
      console.log(result)

      if (result){

        let controller = result.data
        if (!controller.map_entries){
          controller.map_entries = []

        }
        let pos = [0,0]
        let newentry = {pos:pos,name:this.myview}
        controller.map_entries.push(newentry)


        this.ds.update_controller_map_entry(controller._id.$oid, this.myview).then((data:any) => {
            console.log('set_controller_setting : '+ JSON.stringify(data));
            this.auth.resumeSubscriptions()
            console.log(controller)

        }).catch((error) => {
            console.log(error);
        });
        console.log(controller)






      }
    });
  }
  ionViewDidEnter(){
    // setTimeout(() => {
    //   this.cdr.markForCheck();
    //   this.cdr.detectChanges();
    // }, 100);

    if (this.ds.controllers){
      this.auth.processHomeControllers(this.ds.controllers)
    }

    this.auth.currentpage = 'home'
    // this.auth.currentcontroller = null
    if (!this.auth.pausesubs){
      this.auth.subscribeHomePage()

    }

    // if (this.loc.initialized){
    //   if (this.loc.hvacs){
    //     for (let hvac of this.loc.hvacs){
    //       this.auth.subscribeController(this.loc,hvac,(this.auth.getUTCTime() - (86400)), this.auth.getUTCTime())
    //     }
    //   }
    //   if (this.loc.coolers){
    //     for (let cooler of this.loc.coolers){
    //       this.auth.subscribeController(this.loc,cooler,(this.auth.getUTCTime() - (86400)), this.auth.getUTCTime())
    //     }
    //   }
    // }

  }

  ionViewWillEnter() {
  }

  setView(view:string){
    this.myview = view
    console.log(this.myview)
  }

  filterMyView(type:string){
    let newarray = [];
    if (this.auth.location.controllers){
      for (let i of this.auth.location.controllers){
        if (type == 'hvac'){
          if ((i.type == 'hvac' || i.type == 'vpat4') && !this.auth.otherSensor(i.name)){
            console.log('view is hvac...')
            if (i.map_entries){
              for (let j of i.map_entries){
                if (j.name == this.myview){
                  newarray.push(i)
                }
              }
            }
          }

        }
        else if(type == 'cooler'){
          if ( i.type == 'hvac' &&
            this.auth.contains(i.name,'cooler') ||
            this.auth.contains(i.name,'freezer') ||
            (this.auth.contains(i.name,'ice') && !this.auth.contains(i.name, 'office'))
          ){
            if (i.map_entries){
              for (let j of i.map_entries){
                if (j.name == this.myview){
                  newarray.push(i)
                }
              }
            }
          }
        }
        else if (type == 'light'){
          if (i.type == 'light'){
            if (i.map_entries){
              for (let j of i.map_entries){
                if (j.name == this.myview){
                  newarray.push(i)
                }
              }
            }
          }

        }
        else if (type == 'power'){
          if (i.type == 'kw_meter' || i.name.toLowerCase().indexOf('kw') > -1){
            if (i.map_entries){
              for (let j of i.map_entries){
                if (j.name == this.myview){
                  newarray.push(i)
                }
              }
            }

          }

        }
        else{
          // sensor

          if (i.type == 'map_icon' || this.auth.otherSensor(i.name)) {
            if (i.map_entries){
              for (let j of i.map_entries){
                if (j.name == this.myview){
                  newarray.push(i)
                }
              }
            }
          }
        }
        // if (i.map_entries){
        //   for (let j of i.map_entries){
        //     if (j.name == this.myview){
        //       newarray.push(i)
        //     }
        //   }
        // }

      }
    }

    if (newarray.length == 0){
      if (type == 'hvac'){
        this.hvacsInView = null;
      }
      else if (type == 'cooler'){
        this.coolersInView = null;
      }
      else if (type == 'light'){
        this.lightsInView = null;
      }
      else if (type == 'power'){
        this.powerInView = null;
      }
      else{
        this.sensorsInView = null;
      }
      return false;
    }
    else{
      newarray = _.orderBy(newarray, ['order'], ['desc']);
      console.log(newarray)
      if (type == 'hvac'){
        this.hvacsInView = newarray;
      }
      else if (type == 'cooler'){
        this.coolersInView = newarray;
      }
      else if (type == 'light'){
        this.lightsInView = newarray;
      }
      else if (type == 'power'){
        this.powerInView = newarray;
      }
      else{
        this.sensorsInView = newarray;
      }
      return true;
    }


  }

  inView(controller: any){
    for (let i of controller.map_entries){
      if (i.name == this.myview){
        return true
      }
    }
    return false
  }

  buttonColor(pageName) {
    if (pageName == this.auth.currentPage) {
        return 'light';
    }
    return 'primary';
  }

  isPageSelected(pageName) {
      if (pageName == this.auth.currentPage) {
          return true;
      }
      return false;
  }


  ionViewCanEnter(): boolean | Promise<any> {
    console.log('HomePage ionViewCanEnter ...');
  	return this.auth.authenticated;
  }


  logout() {
    clearInterval(this.auth.datainterval)
    this.router.navigate(['LoginPage']);
    this.auth.user = null;
    this.auth.locations = null;
  }

  typeClick() {
    this.filter = 'all'
    this.mylocs = this.auth.locations;

  }
  async openModal(light: any, loc: any){
    console.log(light)
    var data = []
    data[0] = light
    // data[1] = this.hvac;
    data[1] = loc;
    //
    const modalPage = await this.modalCtrl.create(
      { component: LightmodalComponent, componentProps: data}
    );
    // modalPage.onDidDismiss((newdata) => {
    //   this.modalopen = false
    // // do something with data
    // });
    return await modalPage.present();
    // this.modalopen = true;
  }

  specialClick(color: string) {
    this.filter = color;

    if (this.type == 'hvac'){
      this.mylocs = [];
      if (this.filter == 'lightgreen') {

        for (let i of this.auth.locations) {
          if (i.hvaccolor == 'lightgreen'){
            this.mylocs.push(i)
          }
        }
      }
      if (this.filter == '#FEFE83') {

        for (let i of this.auth.locations) {
          if (i.hvaccolor == '#FEFE83'){
            this.mylocs.push(i)
          }
          // this would be if yellow gets red as well
          // if (i.hvaccolor == '#F45151'){
          //   this.mylocs.push(i)
          // }
        }
      }
      if (this.filter == '#F45151') {

        for (let i of this.auth.locations) {
          if (i.hvaccolor == '#F45151'){
            this.mylocs.push(i)
          }
        }
      }
      if (this.filter == 'all') {

        this.mylocs = this.auth.locations;
      }
      if (this.filter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.mylocs.push(i)
          }
        }
      }

    }
    if (this.type == 'freezer'){
      this.mylocs = [];
      if (this.filter == 'lightblue') {

        for (let i of this.auth.locations) {
          if (i.coolercolor == 'lightblue'){
            this.mylocs.push(i)
          }
        }
      }
      if (this.filter == 'orange') {

        for (let i of this.auth.locations) {
          if (i.coolercolor == 'orange'){
            this.mylocs.push(i)
          }
        }
      }

      if (this.filter == 'all') {

        this.mylocs = this.auth.locations;
      }
      if (this.filter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.mylocs.push(i)
          }
        }
      }

    }


  }

  initialize() {
    // setTimeout(() => {
    //   this.cdr.markForCheck();
    //   this.cdr.detectChanges();
    // }, 100);
    // if (this.ds.controllers){
    //   this.processHomeControllers()
    // }
    //
    // this.auth.fetchControllers(this.processHomeControllers());

    this.auth.buildLocationObject(() => {
        console.log('buildLocationObject complete');

        this.locationName = this.auth.location.name;
        // setTimeout(() => {
        //   this.cdr.markForCheck();
        //   this.cdr.detectChanges();
        // }, 100);

    });
  }

  ngOnInit() {
    console.log(this.router.url)
  }

  getItems(event: any){

  }

  itemSelected(item:any){

  }

  gotoloc(event: any){
    console.log(this.router.url);
    let nextPage = this.router.url+'/event';
    this.router.navigate([nextPage]);
  }

  gotoPage(controller, page){
    if (!this.removing){
      let nextPage = this.router.url+'/'+page;
      console.log('gotoPage : '+this.router.url+' , next : '+nextPage);
      console.log(controller)
      this.auth.unsubscribeHvacPage(controller);
      this.auth.currentController = controller
      this.router.navigate([nextPage], { state: { back:true, controller:controller } });
      this.auth.lastUrl = '/tabs/home'
    }
    else{
      this.auth.pausesubs = true;

      let newmapentries = []
      for (let i of controller.map_entries){
        if (i.name != this.myview){
          newmapentries.push(i)
        }
      }
      controller.map_entries = newmapentries
      this.ds.remove_controller_map_entry(controller._id.$oid, this.myview).then((data:any) => {
              console.log('set_controller_setting : '+ JSON.stringify(data));
              this.auth.resumeSubscriptions()
              // this.loadControllerSetting(path);
              // this.loadControllerGroupSettings();
          }).catch((error) => {
              console.log(error);
          });
      console.log(controller)
    }
  }

  getSelectedClass(filter:any) {
      if (this.filter == filter.filter)
        return filter.selected;
      else
        return filter.notselected;
  }

  getSensorValue(sensor:any) {
    let value: any = "--";
    switch (sensor.type) {
      case "hvac":
        console.log('getSensorValue checking space')
        if (sensor.status && sensor.status.sockets){
        value = sensor.status.sockets.space;
        value = (Math.round(10*value)/10).toString()
        value = value.toString()
        }
        break;
      case "map_icon":
        // if (sensor.status.sockets && sensor.status.sockets.input) {
        if (sensor.status && sensor.status.sockets) {
          if (sensor.status.sockets.input != undefined) {
            value = sensor.status.sockets.input;
            value = Math.round(10*value)/10

          } else if (sensor.status.sockets.output) {
            value = sensor.status.sockets.output;
            value = (Math.round(10*value)/10).toString()


          }
        }
        //   if (this.contains(sensor.name.toLowerCase(),('door'))) {
        //     value =  (value) ? 'Closed' : 'Open';
        //   }
        // } else if (sensor.status.num) {
        //   value =  sensor.status.num;
        // }
        // value = sensor.status.sockets.input;
        break;
      case "kw_meter":
        if (sensor.status) {
          if (sensor.status.d != undefined) {
            value = sensor.status.d
            // value = Math.round(10*value)/10

          }
        }
        break;

    }
    //let value = sensor.status.sockets.space;
    // value = sensor.status.sockets.input;
    return value;
  }
  getSensorIcon(sensor:any) {
     let value;
     if (sensor.settings && sensor.settings.map_icon && sensor.settings.map_icon.icon_type) {
       let setting = sensor.settings.map_icon;

       // console.log('getSensorIcon : ',sensor.settings);
       // for (let setting of sensor.settings) {
       //     if (setting.name == 'icon_type' && setting.local) {
        switch (setting.icon_type) {
          case "door":
            value = 'assets/images/door_b.png';
            break;
          case "setpoint":
            // value = 'assets/images/setpoint_p.png';
            // value = 'assets/images/target.png';
            value = 'assets/images/bullseye3.png';
            break;
          case "amps":
            value = 'assets/images/amperage_icon.png';
            break;
          case "co2":
            value = 'assets/images/co2_b.png';
            break;
          case "pressure":
              value = 'assets/images/pressure3.png';
              break;
          case "humidity":
              value = 'assets/images/humidity_b.png';
              break;
          case "condensation":
              value = 'assets/images/raindrops.png';
              break;
          case "temp":
            value = 'assets/images/temperature2.png';
            break;
          case "switch":
            value = 'assets/images/toggle-switch.png';
            break;
        }
           // }
       // }
     }
     return value;

  }

}
