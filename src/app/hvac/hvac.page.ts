import { Component,ViewChild, ViewEncapsulation} from '@angular/core';
// import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { DataService } from '../providers/data.service';

import { PopupService } from '../providers/popup.service';

import { IonicModule, ModalController } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';

import { TestmodalPage } from '../testmodal/testmodal'


import { ControllerSettingsComponent } from '../components/controller-settings/controller-settings.component'
import { ControllerModesComponent } from '../components/controller-modes/controller-modes.component'
import { ControllerSchedulesComponent } from '../components/controller-schedules/controller-schedules.component';
import { AssignScheduleComponent } from '../components/assign-schedule/assign-schedule.component';
import { HistoryComponent } from '../components/history/history.component';

import { SpeditPage } from '../spedit/spedit';

// import moment from 'moment';
// import { LaunchNavigator } from '@ionic-native/launch-navigator';
// import { CallNumber } from '@ionic-native/call-number';
// import { Chart } from 'chart.js';

// const INC_RATIO = 0.043478;
// const INC_MULTIPLIER = 100;
// const INC = INC_RATIO * INC_MULTIPLIER;
// const INC_OFF = 25;
// const INC_M = INC_OFF * INC;

/**
 * Generated class for the HvacPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const INFO = 0;
 const SETTINGS = 1;
 const SCHEDULES = 2;
 const MODES = 3;

// @IonicPage()
@Component({
  selector: 'page-hvac',
  templateUrl: 'hvac.page.html',
  styleUrls: ['./hvac.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HvacPage {

  @ViewChild('graphCanvas') graphCanvas;

  state:any;
  location:any;
  hvac:any;
  settings:any [];

  pushPage:any = "HistoryPage";
  alarms:any [];
  // hvac:any;
  perf:any;

  showPerf:boolean = false;
  editable:boolean = true;
  editbuttons:boolean = false;
  ovcount:number = 0;
  oldcsp:number = 0;
  oldhsp:number = 0;
  newovcount:number = 0;
  ov: boolean = false;
  ovdur:number = 0;
  ovcountmax:number = 1;
  csp: number;
  hsp: number;
  addfalse:any = false;
  subfalse:any = false;
  newcsp:number = 0;
  newhsp:number = 0;
  public modalopen: boolean = false;
  changed:boolean;

  retrievedSettings:boolean = false;
  lineGraph:any;
  thing: any;
  timearray: any;
  valuearray: any;
  minvalue: any;
  maxvalue: any;
  interval:any;
  modalPage:any;
  displayMode = INFO;
  selectedSetting:any;
  // myogmode:any = this.auth.getOGMode(this.this.router.getCurrentNavigation().extras.state.controller);

  // commonKeyboardOptions = {
  //     onChange: (input: string) => this.onChange(input),
  //     onKeyPress: (button: string) => this.onKeyPress(button),
  //     layout: {
  //       default: ["1 2 3 -", "4 5 6 {backspace}", "7 8 9 {enter}", "{left} 0 . {right}"]
  //     },
  //     display: {
  //       "{down}": "▼",
  //       "{backspace}": "Del",
  //     },
  //     // theme: "hg-theme-default hg-layout-numeric numeric-theme",
  //     theme: "simple-keyboard hg-theme-default hg-layout-default",
  //     physicalKeyboardHighlight: true,
  //     syncInstanceInputs: true,
  //     mergeDisplay: true,
  //     debug: true
  // };
  //
  // simpleKeyboard:Keyboard;

  constructor(
    public modalCtrl: ModalController,
    // private callNumber: CallNumber,
    // private launchNavigator: LaunchNavigator,
    public auth: AuthLocalProvider,
    public popup: PopupService,
    // public navCtrl: NavController,
    // public navParams: NavParams,
    public router: Router,
    public ds: DataService,
  ) {

    // for (let loc of this.auth.locations){
    //   if (loc.secret_key == this.navParams.data[0].secret_key){
    //     for (let hvac of loc.hvacs){
    //       if (hvac.status.controller_id == this.navParams.data[1].status.controller_id){
    //         this.hvac = hvac;
    //         this.perf = hvac.perf;
    //       }
    //
    //     }
    //
    //   }
    // }

    // this.interval = setInterval(() => {
    //
    //   this.lineGraph = new Chart(this.graphCanvas.nativeElement, {
    //
    //           type: 'line',
    //           data: {
    //               labels: this.timearray,
    //               datasets: [{
    //                   label: 'Space Temp.',
    //                   fill: false,
    //                   lineTension: 0,
    //                   pointRadius: 0,
    //                   data: this.valuearray,
    //                   backgroundColor: [
    //
    //
    //                   ],
    //                   borderColor: 'black',
    //                   borderWidth: 1
    //               }]
    //           },
    //           options: {
    //
    //               scales: {
    //                   yAxes: [{
    //
    //                       ticks: {
    //                         maxTicksLimit: 24,
    //
    //                           // beginAtZero:true
    //                           // suggestedMin: (this.minvalue - 1),
    //                           // suggestedMax: this.maxvalue + 1
    //                       }
    //                   }],
    //                   xAxes: [{
    //                     gridLines: {
    //                       display:false
    //                     },
    //                       ticks: {
    //                           maxTicksLimit: 24
    //                       }
    //                   }]
    //               }
    //           }
    //
    //       });
    //
    // }, 10000);



  }




  ionViewDidEnter(){
    // this.auth.currentpage = 'controller'
    // this.auth.currentcontroller = this.hvac
    // if (!this.auth.pausesubs){
    //   this.auth.subscribeHvacPage(this.state.controller)
    //
    // }
    this.hvac = this.auth.currentController;
    this.perf = this.hvac.perf;
    this.auth.subscribeHvacPage(this.hvac)
    this.auth.subscribeHomePage()

  }

  ngOnInit() {

    // this.state = this.router.getCurrentNavigation().extras.state;
    // console.log(this.router.getCurrentNavigation())
    // console.log('got state from parent ... : '+JSON.stringify(this.state ));
    //
    // this.hvac = this.state.controller;
    // this.perf = this.hvac.perf;
    // console.log(this.hvac)
    // this.loadControllerGroupSettings();
    // this.auth.subscribeControllerSettings(this.state.controller)
    // this.auth.subscribeControllerStatHist(this.state.controller)
    // this.auth.subscribeControllerModes(this.state.controller)
    //
    //
    // this.auth.runHvacUpdates(this.state.location, this.state.controller)
    // this.lineGraph = new Chart(this.graphCanvas.nativeElement, {
    //
    //         type: 'line',
    //         data: {
    //             labels: this.timearray,
    //             datasets: [{
    //                 label: 'Space Temp.',
    //                 fill: false,
    //                 lineTension: 0,
    //                 pointRadius: 0,
    //                 data: this.valuearray,
    //                 backgroundColor: [
    //
    //
    //                 ],
    //                 borderColor: 'black',
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //
    //             scales: {
    //                 yAxes: [{
    //
    //                     ticks: {
    //                       maxTicksLimit: 24,
    //
    //                         // beginAtZero:true
    //                         // suggestedMin: (this.minvalue - 1),
    //                         // suggestedMax: this.maxvalue + 1
    //                     }
    //                 }],
    //                 xAxes: [{
    //                   gridLines: {
    //                     display:false
    //                   },
    //                     ticks: {
    //                         maxTicksLimit: 24
    //                     }
    //                 }]
    //             }
    //         }
    //
    //     });
    // this.interval = setInterval(() => {
    //
    //   this.lineGraph = new Chart(this.graphCanvas.nativeElement, {
    //
    //           type: 'line',
    //           data: {
    //               labels: this.timearray,
    //               datasets: [{
    //                   label: 'Space Temp.',
    //                   fill: false,
    //                   lineTension: 0,
    //                   pointRadius: 0,
    //                   data: this.valuearray,
    //                   backgroundColor: [
    //
    //
    //                   ],
    //                   borderColor: 'black',
    //                   borderWidth: 1
    //               }]
    //           },
    //           options: {
    //
    //               scales: {
    //                   yAxes: [{
    //
    //                       ticks: {
    //                         maxTicksLimit: 24,
    //
    //                           // beginAtZero:true
    //                           // suggestedMin: (this.minvalue - 1),
    //                           // suggestedMax: this.maxvalue + 1
    //                       }
    //                   }],
    //                   xAxes: [{
    //                     gridLines: {
    //                       display:false
    //                     },
    //                       ticks: {
    //                           maxTicksLimit: 24
    //                       }
    //                   }]
    //               }
    //           }
    //
    //       });
    //
    // }, 10000);
  }

  back() {
      this.router.navigateByUrl('/tabs/home');
  }

  getHSPVpat4(){
    let status = this.hvac.status
    if (status){
      let sched = status.sched
      console.log(sched)
      if (sched){
        if (sched.mode == 'always on'){
          console.log(status.sockets.occupiedheat)
          return status.sp.occupied_heat_sp
        }
        else if (sched.mode == 'always off'){
          return status.sp.unoccupied_heat_sp
        }
        else{
          console.log(sched.name)
          if (sched.name == 'occupied'){
            return status.sp.occupied_heat_sp

          }
          else{
            return status.sp.unoccupied_heat_sp

          }
        }
      }
    }
  }

  getCSPVpat4(){
    console.log(this.hvac.status)
    let status = this.hvac.status
    if (status){
      let sched = status.sched
      if (sched){
        if (sched.mode == 'always on'){
          return status.sp.occupied_cool_sp
        }
        else if (sched.mode == 'always off'){
          return status.sp.unoccupied_cool_sp
        }
        else{
          if (sched.name == 'occupied'){
            return status.sp.occupied_cool_sp

          }
          else{
            return status.sp.unoccupied_cool_sp

          }
        }
      }
    }
  }

  async startov(){
    console.log('startov ...');
    this.auth.pausesubs = true;
    this.hvac.status.ov = {}
    this.hvac.status.ov.adj = this.newovcount;
    for (let mode of this.hvac.modes){
      if (mode.name == "HIGH" || mode.name == "OCCUPIED"){
        this.hvac.status.sp.h = mode.h_sp;
        this.hvac.status.sp.c = mode.c_sp;
      }
    }

    // clearTimeout(this.hvac.timer);
    // this.auth.unsubscribeHvacPage(this.hvac)
    // this.auth.unsubscribeHomePage()
    const result = await this.ds.set_controller_override(this.hvac._id.$oid, {"dur_sec": this.hvac.settings.override_min, "adj": 0});


    this.auth.resumeSubscriptions()
  }

  ionViewWillLeave() {
    // if (this.modalopen) {
    //   this.modalPage.dismiss();
    // }
    // this.auth.unsubscribeHvacPage(this.state.controller);

    this.auth.unsubscribeHvacPage(this.auth.currentController);
    this.auth.unsubscribeHomePage();
    console.log(this.state.controller)
    console.log('mountain')
  }

  public async openModal(type:string) {
    // data[0] = light
    // // data[1] = this.hvac;
    // data[1] = loc;
    var data:any = {};
    // data[0] = this.hvac.modes;
    // data[1] = this.hvac;
    // data[2] = this.navParams.data[0];
    let modalInfo:any = {};
    switch (type) {
        case 'test':
          data.hvac = this.hvac;
          data.location = this.location;
          modalInfo.component = TestmodalPage;
          modalInfo.componentProps = data;
          break;
        case 'schedules':
          // data.controller = this.hvac;
          // // data.schedules = this.schedules;
          // modalInfo.component = ControllerSchedulesComponent;
          // modalInfo.componentProps = data;
          // modalInfo.cssClass = 'schedule-modal-css';

          break;
        case 'settings':
          data.controller = this.hvac;
          // data.schedules = this.schedules;
          modalInfo.component = ControllerSettingsComponent;
          modalInfo.componentProps = data;
          modalInfo.cssClass = 'settings-modal-css';

          break;
        case 'modes':
          data.controller = this.hvac;
          // data.schedules = this.schedules;
          modalInfo.component = ControllerModesComponent;
          modalInfo.componentProps = data;
          modalInfo.cssClass = 'modes-modal-css';

          break;
    }
    this.popup.openModal(modalInfo);
    // this.modalPage = await this.modalCtrl.create( modalInfo );
    //
    // // var modalPage = await this.modalCtrl.create({
    // //   component: TestmodalPage,componentProps: data }
    // // );
    // this.modalPage.onDidDismiss().then(data=>{
    //   this.modalopen = false;
    //   console.log(data)
    // })
    // // modalPage.onDidDismiss();
    // await this.modalPage.present();
    // this.modalopen = true;
  }




  public async spoverride(setpoint: string) {
    console.log('spoverride called ...');
    // data[0] = light
    // // data[1] = this.hvac;
    // data[1] = loc;
    var data:any = {}
    // data[0] = this.hvac.modes;
    // data[1] = this.hvac;
    // data[2] = this.navParams.data[0];
    data.type = setpoint
    data.hvac = this.hvac;
    // data.location = location;
    // data[2] = this.navParams.data[0];
    var modalPage = await this.modalCtrl.create({ component:SpeditPage, componentProps:{type:setpoint,hvac:this.hvac} });
    // modalPage.onDidDismiss((newdata) => {
    //   this.modalopen = false
    // // do something with data
    // });
    await modalPage.present();
    // this.modalopen = true;
  }




  async quitov(){
    this.hvac.status.ov = null;
    this.auth.pausesubs = true;


    // let ogmode = this.auth.getOGMode(this.hvac)
    // for (let mode of this.hvac.modes){
    //   if (mode.name == ogmode){
    //     this.hvac.status.sp.h = mode.h_sp;
    //     this.hvac.status.sp.c = mode.c_sp;
    //   }
    // }
    // this.navParams.data[0].status.ov.r = moment.utc(this.navParams.data[0].status.dur*1000).format('HH:mm:ss');
    // this.changed = true;
    // this.changed = true;
    // clearTimeout(this.hvac.timer);
    // this.auth.unsubscribeHvacPage(this.hvac)
    // this.auth.unsubscribeHomePage()
    // this.hvac.modessub.unsubscribe()
    const result = await this.ds.clear_controller_override(this.hvac._id.$oid);
    // this.changed = false;
    // need to essentially wait for the clear override call to have been processed
    // in the mongo state, calling a get controllers too soon will result in a
    // stale response from the server that still thinks it's overriden at the time
    // of call reception
    this.auth.resumeSubscriptions()



  }


  logout() {
    clearInterval(this.auth.datainterval);
    // setTimeout(function () {
    //     // self.mapComponent.updateSize();
    //     // this.auth.user = null;
    //     // this.auth.locations = null;
    //     // this.navCtrl.setRoot('LoginPage');
    // }, 200);
    // this.navCtrl.popToRoot();
    clearInterval(this.auth.datainterval)
    this.router.navigate(['LoginPage']);
    this.auth.user = null;
    this.auth.locations = null;
    this.auth.loginTime = 0;
  }

  mapClick() {

      // let options: LaunchNavigatorOptions = {
      //   app: LaunchNavigator.APPS.USER_SELECT
      // };
      console.log('mapClick()...')
      /*
      this.launchNavigator.navigate(this.navParams.data[0].name)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
      */
  }

  specialClick(){

    // this.auth.getPhone(this.navParams.data[0])
    this.auth.getPhone(this.location)
    .subscribe(
        data => {
          console.log('callNumber here!')
          // this.callNumber.callNumber(data.result, true)
          // .then(res => console.log('Launched dialer!', res))
          // .catch(err => console.log('Error launching dialer', err));
        }
    )

  }


  //
  // getAlarms(cid:any):any[] {
  //   console.log('getting alarm data for cid: '+cid);
  //   for (let hvac of this.navParams.data[0].daily_logs_stuff.hvacs) {
  //       if (cid == hvac.controller_id) {
  //         console.log('found havc, getting alarms');
  //         return hvac.alarms;
  //       }
  //   }
  //   return [];
  // }
  //
  // codes = [
  //
  //   { code:"fz_high", display:"Freezer High"},
  //   { code:"cool_fail",display:"Cool Fail"},
  //   { code:"heat_fail",display:"Heat Fail"},
  //   { code:"fz_low",display:"Freezer Low"},
  //   { code:"contact",display:"Trigger"},
  //   { code:"co2",display:"CO2"},
  //   { code:"fire system trouble",display:"Fire System Trouble"},
  //   { code:"engine running",display:"Engine Running"},
  //   { code:"free_cool_fail",display:"Free Cool Fail"},
  //   { code:"open_door",display:"Open Door"},
  //   { code:"back_door",display:"Back Door"},
  //   { code:"back_side_door",display:"Back Side Door"},
  //   { code:"freezer_door",display:"Freezer Door"},
  //   { code:"alarm",display:"Alarm"},
  //   { code:"door_alarm",display:"Door Alarm"},
  //   { code:"c/door",display:"Cooler Door"},
  //   { code:"f/door",display:"Freezer Door"},
  //   { code:"cooler_door",display:"Cooler Door"},
  //   { code:"keg_door",display:"Keg Door"},
  //   { code:"beer cooler_door",display:"Beer Cooler Door"},
  //   { code:"door",display:"Door"},
  //   { code:"prep_door",display:"Prep Door"},
  //   { code:"base_cooler_door",display:"Beer Cooler Door"},
  //   { code:"beer_door",display:"Beer Door"},
  //   { code:"kit_cooler_door",display:"Kit Cooler Door"},
  //   { code:"door alarm",display:"Door Alarm"},
  //   { code:"door_open",display:"Door Open"},
  //   { code:"comp. 2 alarm",display:"Comp 2 Alarm"},
  //   { code:"humidity_high",display:"Humidity High"},
  //   { code:"fzr_low",display:"Freezer Low"},
  //   { code:"fzr_high",display:"Freezer High"},
  //   { code:"server_hot",display:"Server Hot"},
  //   { code:"temp",display:"Temp"},
  //   { code:"door_oen",display:"Door Open"},
  //   { code:"boiler_alarm",display:"Boiler Alarm"},
  //   { code:"co2_alarm",display:"CO2 Alarm"},
  //   { code:"h2o_alarm",display:"H2O Alarm"},
  //   { code:"suction_temp_low",display:"Suction Temp Low"},
  //   { code:"pressure alarm",display:"Pressure Alarm"},
  //   { code:"temp_high",display:"Temp High"},
  //   { code:"co2_high",display:"CO2 High"},
  //   { code:"alarm output",display:"Alarm Output"},
  //   { code:"contact_smoke",display:"Contact Smoke"},
  //   { code:"contact_11",display:"Contact 11"},
  //   { code:"freezer door open",display:"Freezer Door Open"},
  //   { code:"cooler door open", display:"Cooler Door Open"}
  //
  // ];
  //
  // getCode(code:string) {
  //   for (let cb of this.codes) {
  //     if (cb.code == code.trim()) {
  //        return cb.display;
  //     // } else {
  //     //   console.log('failed : '+cb.code+' , '+code);
  //     }
  //   }
  //   console.log('could not find code : '+code);
  //   return 'UNKNOWN CODE';
  // }
  //
  // getDateFromTS(ts:any) {
  //   // var t:Date = new Date( ts.$date );
  //   // gregm, if moment.js VVVVVVV
  //   let dt = moment.utc(moment.unix(ts.$date/1000))
  //   // let hm = dt.format('h:mm')
  //   // location.ampm = dt.format('a')
  //   // location.day = dt.format('dddd, MMMM D')
  //   // let zonecord = offset/3600
  //
  //   var formatted = dt.format("lll");
  //   return formatted;
  //   // return t.toISOString();
  // }

  // format_minutes(v) {
  //     if (v > 60) {
  //         v = v / 60.0
  //         let value = Math.round(v * 100) / 100;
  //         return  value + " hours"
  //     } else {
  //         let value = Math.round(v * 100) / 100;
  //         return  value + " minutes"
  //     }
  // }
  //
  // getAvgOnTime(c) {
  //     let avgOnTime = '';
  //     if (c && c.on) {
  //         avgOnTime = this.format_minutes(c.on)
  //         // avg = Math.round(k.avg * 100) / 100;
  //     }
  //     return avgOnTime;
  // }
  //
  // getAvgSetpoint(k) {
  //     let total = 0;
  //     if (k && k.total) {
  //         total = Math.round(k.total * 100) / 100;
  //     }
  //     return total;
  // }
  //
  // getStage1Runtime(k) {
  //     let davg = 0;
  //     if (k && k.davg) {
  //         davg = Math.round(k.davg * 100) / 100;
  //     }
  //     return davg;
  // }
  //
  // getStage2Runtime(k) {
  //     let min = 0;
  //     if (k && k.min) {
  //         min = Math.round(k.min * 100) / 100;
  //     }
  //     return min;
  // }
  //
  // getMaxDemand(k) {
  //     let peak = 0;
  //     if (k && k.peak) {
  //         peak = Math.round(k.peak * 100) / 100;
  //     }
  //     return peak;
  // }
  //
  //
  // get_perf_pct(value) {
  //     let pct = 0.0;
  //     if (value) {
  //         let mins = value/60.0;
  //         pct = Math.floor(Math.max(0, Math.min(100, INC_M - (mins*INC)) ));
  //     }
  //     return pct;
  // }
  //
  //
  // get_perf_seconds(value) {
  //     let seconds = '';
  //     if (value) {
  //         if (value > 3600)  {
  //              value = (value/3600);
  //              value = Math.round(value * 100) / 100;
  //              seconds = value +' hours';
  //         } else if (value > 60) {
  //             value = (value/60);
  //             value = Math.round(value * 100) / 100;
  //             seconds = value +' minutes';
  //         } else {
  //             value = Math.round(value * 100) / 100;
  //             seconds = value +' seconds';
  //         }
  //     } else {
  //         seconds = '--'
  //     }
  //     return seconds;
  // }

  // hasAlarmData() {
  //    let data = this.navParams.data[1];
  //    if (data && data.perf && data.perf.alarms) {
  //       return true;
  //    }
  //    return false;
  // }
  //
  // hasSpaceTemp() {
  //     let temp = 0.0;
  //     if (this.hvac.status && this.hvac.status.sockets && this.hvac.status.sockets.space) {
  //         return true;
  //     }
  //     return false;
  // }

  // getStateText() {
  //   let state = this.hvac.status.state;
  //   let text = "Idle";
  //   if (state.toLowerCase() == 'cooling') {
  //     text = "Cooling";
  //   }
  //   if (state.toLowerCase() == 'heating') {
  //     text = "Heating";
  //   }
  //   return text;
  // }


  getStateClass() {
    let state = this.hvac.status.state;
    let color = ""
    if (state.toLowerCase() == 'cooling') {
      color = "#66a0ff";
    }
    if (state.toLowerCase() == 'heating') {
      color = "#ff5e28";
    }
    return color;
  }

  getStateColor(data:any) {
    if (data.hvaccolor) {
      if (data.hvaccolor == 'lightgreen'){
        return '#248c1d';
      }
      return data.hvaccolor;
    }

    if (data.coolercolor) {
        return data.coolercolor;
    }
  }
  // hasCoolingSetpoint() {
  //   return this.hvac.csp;
  // }
  //
  // hasHeatingSetpoint() {
  //   return this.hvac.hsp;
  // }
  // hasCo2Setpoint() {
  //   return true;
  // }
  // hasHumiditySetpoint() {
  //   return true;
  // }
  //
  // roundTwoDigits(s) {
  //   let r = Math.round(s * 10) / 10
  //   return r;
  // }

  loadControllerGroupSettings() {
    this.ds.get_controller_settings_group(this.hvac._id.$oid,'hvac').then((data:any) => {
        console.log('get_controller_settings_group : ',data.length);
        this.settings = data;
        // this.updateWithControllerSettings();
        // if (this.controller.settings && this.controller.settings.hvac) {
        //   let hvacSettings = this.controller.settings.hvac;
        //   let keys:any = this.propertyKeys(hvacSettings);
        //     keys.forEach((key)=> {
        //       this.settings[key] = hvacSettings[key];
        //     });
        // }

    }).catch((error) => {
        console.log(error);
    });
  }

  selectView(v) {
      this.displayMode = v;
  }

  getDisplayType() {
    return this.displayMode;
  }

  closeSelectedSetting() {

  }

  closeSelectedSchedule() {

  }
  saveSchedule() {

  }

  // editSetting(item:any, idx:number) {
  //
  //   // let setting = this.getSettingForIndex(idx);
  //   let setting = this.settings[idx];
  //   if (setting) {
  //     this.selectedSetting = setting;
  //     this.selectedIndex = idx;
  //     this.value = item.val;
  //     setTimeout(() => {
  //       this.simpleKeyboard = new Keyboard("#settingKeyboard",
  //             this.commonKeyboardOptions
  //       );
  //       this.settingInput.nativeElement.focus();
  //       this.simpleKeyboard.setInput(item.val);
  //       console.log("editSetting", this.simpleKeyboard);
  //     }, 200);
  //   }
  //
  // }

  saveSetting() {
    if (this.selectedSetting) {
      let val = this.selectedSetting.val;
      // let update = {
      //   id:this.controller._id.$oid,
      //   path:'hvac.'+this.selectedSetting.name.toLowerCase(),
      //   value:this.selectedSetting.val
      // };
      this.selectedSetting.local = val;
      let path = this.selectedSetting.name.toLowerCase();
      this.ds.set_controller_setting(this.hvac._id.$oid, 'hvac.'+path, Number(val)).then((data:any) => {
          console.log('set_controller_setting : '+ JSON.stringify(data));
          // this.loadControllerSetting(path);
          // this.loadControllerGroupSettings();
      }).catch((error) => {
          console.log(error);
      });

      delete this.selectedSetting;
      this.removeKeyboard();

    }
  }

  removeKeyboard() {
    // if (this.simpleKeyboard) {
    //   this.simpleKeyboard.destroy();
    //   delete this.simpleKeyboard;
    // }
  }

  canOverride() {
    return true;
  }

}
