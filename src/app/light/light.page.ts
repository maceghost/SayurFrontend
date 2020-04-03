import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, ViewEncapsulation} from '@angular/core';
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

const INFO = 0;
const SETTINGS = 1;
const SCHEDULES = 2;
const MODES = 3;

@Component({
  selector: 'page-light',
  templateUrl: 'light.page.html',
  styleUrls: ['./light.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LightPage implements OnInit {
  value = 0;
  light;
  state;
  modalPage:any;
  displayMode:any = INFO;
  editable:boolean = true;
  modes:any[];
  levelbool:boolean;
  level:number;
  changed:boolean;
  timer:any;
  ogmode:any;

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
  )
  {
    this.value = 0.0;
  }
  getDisplayType() {
    return this.displayMode;
  }
  selectView(v) {
      this.displayMode = v;
  }
  ionViewDidEnter(){
    // this.auth.currentpage = 'controller'
    // this.auth.currentcontroller = this.light
    // if (!this.auth.pausesubs){
    //   this.auth.subscribeHvacPage(this.state.controller)
    //
    // }
    this.light = this.auth.currentController;
    if (this.light.status){
      this.levelbool = this.light.status.levelbool
      // this.auth.subscribeHvacPage(this.state.controller)


      if (!this.light.status.ov){
        if (this.light.status.dimmable){
          this.ogmode = this.light.status.level

        }
        else{
          this.ogmode = this.light.status.levelbool

        }
      }
    }
    this.auth.subscribeHvacPage(this.light)
    this.auth.subscribeHomePage()



  }
  ionViewWillLeave() {

    this.auth.unsubscribeHvacPage(this.state.controller);
    this.auth.unsubscribeHomePage();
    console.log(this.state.controller)
  }
  ngOnInit() {
    this.state = this.router.getCurrentNavigation().extras.state;
    console.log('got state from parent ... : '+JSON.stringify(this.state ));

  }
  async toggle(){
    this.auth.pausesubs = true;

    this.light.status.levelbool = !this.light.status.levelbool;
    if (this.light.status.levelbool){
      this.light.status.level = 100;
      this.light.status.color = "#fffc66"
    }
    else if (!this.light.status.levelbool){
      this.light.status.level = 0;
      this.light.status.color = "darkgrey"
    }

    this.level = this.light.status.level;
    // this.changed = true;
    if (!this.light.status.ov){
      this.light.status.ov = {}

    }

    // this.light.status.ov.r = moment.utc(2700*1000).format('HH:mm:ss');
    // clearTimeout(this.light.timer);
    // this.auth.unsubscribeHvacPage(this.light)
    // this.auth.unsubscribeHomePage()
    const result = await this.ds.set_controller_override(this.light._id.$oid, {"dur_sec": this.light.settings.override_min, "level": this.level});
    // what's the proper override time here?
    this.changed = false;
    // need to essentially wait for the clear override call to have been processed
    // in the mongo state, calling a get controllers too soon will result in a
    // stale response from the server that still thinks it's overriden at the time
    // of call reception
    this.auth.resumeSubscriptions()

  }
  async range(){
    this.auth.pausesubs = true;
    this.level = this.light.status.level
    if (!this.light.status.level){
      this.light.status.color = "darkgrey"

    }

    if (!this.light.status.ov){
      this.light.status.ov = {}

    }
    // this.light.status.ov.r = moment.utc(2700*1000).format('HH:mm:ss');
    this.changed = true;
    // clearTimeout(this.light.timer);
    // this.auth.unsubscribeHvacPage(this.light)
    // this.auth.unsubscribeHomePage()

    const result = await this.ds.set_controller_override(this.light._id.$oid, {"dur_sec": this.light.settings.override_min, "level": this.level});
    // what's the proper override time here?
    this.changed = false;
    // need to essentially wait for the clear override call to have been processed
    // in the mongo state, calling a get controllers too soon will result in a
    // stale response from the server that still thinks it's overriden at the time
    // of call reception
    this.auth.resumeSubscriptions()

  }
  async quitov(){

    this.auth.pausesubs = true;
    this.light.status.ov = null;
    if (this.light.status.dimmable){
      this.light.status.level = this.ogmode
      if (!this.light.status.level){
        this.light.status.color = "darkgrey"
      }
    }
    else{
      this.light.status.levelbool = this.ogmode
      if (this.light.status.levelbool){
        this.light.status.level = 100;
        this.light.status.color = "#fffc66"
      }
      else if (!this.light.status.levelbool){
        this.light.status.level = 0;
        this.light.status.color = "darkgrey"
      }
    }

    this.changed = true;
    // clearTimeout(this.light.timer);
    // this.auth.unsubscribeHvacPage(this.light)
    // this.auth.unsubscribeHomePage()
    const result = await this.ds.clear_controller_override(this.light._id.$oid);
    this.changed = false;
    // need to essentially wait for the clear override call to have been processed
    // in the mongo state, calling a get controllers too soon will result in a
    // stale response from the server that still thinks it's overriden at the time
    // of call reception
    this.auth.resumeSubscriptions()


  }
  getValue() {
    if (this.light.status.sockets) {
      console.log('getValue setting value : '+this.light.status);
      this.value = this.light.status.sockets.input;
    }
    console.log('getValue returning : '+this.value);
    return this.value;
  }
}
