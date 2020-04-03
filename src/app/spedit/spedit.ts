import { Component, Input, OnInit } from '@angular/core';
// import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';
import { DataService } from '../providers/data.service';


// import { ViewController } from 'ionic-angular';
// import * as _ from 'lodash';
// import * as moment from 'moment';

/**
 * Generated class for the SpeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-spedit',
  templateUrl: 'spedit.html',
  styleUrls: ['./spedit.scss']
})
export class SpeditPage implements OnInit {

  editable:boolean = true;
  type:any = this.navParams.get('type');
  hvac:any = this.navParams.get('hvac');;

  setpoint:number;
  modes:any[];
  levelbool:boolean;
  level:number;
  changed:boolean;
  oldcsp:any;
  oldhsp:any;
  newcsp:any;
  newhsp:any;
  newovcount:any = 0;


  override_min:any;
  sp_adjustment_increment:any;
  sp_max_adjustment:any;

// public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams
  constructor(private router:Router, private auth: AuthLocalProvider, private modalCtl:ModalController, private navParams:NavParams,private ds: DataService ) {
    console.log(this.hvac, this.type)


  }




  addclick(){

    console.log(this.sp_max_adjustment)
    if (this.newovcount != this.sp_max_adjustment){

      this.newcsp += this.sp_adjustment_increment;
      this.newhsp += this.sp_adjustment_increment;
      this.newovcount += this.sp_adjustment_increment;

    }




  }

  subtractclick(){
    console.log(this.sp_adjustment_increment)
    console.log(this.newovcount)

    if (this.newovcount != -this.sp_max_adjustment){
      console.log(this.sp_adjustment_increment)

      this.newcsp -= this.sp_adjustment_increment;
      this.newhsp -= this.sp_adjustment_increment;
      this.newovcount -= this.sp_adjustment_increment;

    }
    console.log(this.newovcount)

  }
  async savesp(){


    this.auth.pausesubs = true;

    this.hvac.status.sp.h = this.newhsp;
    this.hvac.status.sp.c = this.newcsp;

    if (this.newovcount == 0){
      // right now the ruby shchema doesnt update enough info for to find og mode
      // so like flash app it has to just blanket cancel the override if it returns
      // to 0, not stay in override if the og mode was already not high
      if (this.hvac.status.sched.mode_name == 'HIGH'){
        this.hvac.status.ov = null;



        // clearTimeout(this.hvac.timer);
        // this.hvac.stathistsub.unsubscribe()
        // this.hvac.settingssub.unsubscribe()
        // this.auth.location.timesubscription.unsubscribe()
        const result = await this.ds.clear_controller_override(this.hvac._id.$oid);

        // this.auth.resumeSubscriptions()

      }
      else {
        this.hvac.status.ov = {}
        this.hvac.status.ov.adj = this.newovcount;
        // clearTimeout(this.hvac.timer);
        // this.hvac.stathistsub.unsubscribe()
        // this.hvac.settingssub.unsubscribe()
        // this.auth.location.timesubscription.unsubscribe()

        const result = await this.ds.set_controller_override(this.hvac._id.$oid, {"dur_sec": this.hvac.settings.override_min, "adj": 0});
        // this.auth.resumeSubscriptions()

      }

      // if (this.auth.getOGMode(this.hvac) == "HIGH"){
      //
      //   this.hvac.status.ov = null;
      //   for (let mode of this.hvac.modes){
      //     if (mode.name == "HIGH"){
      //       this.hvac.status.sp.h = mode.h_sp;
      //       this.hvac.status.sp.c = mode.c_sp;
      //     }
      //   }
      //
      //
      //   clearTimeout(this.hvac.timer);
      //   this.hvac.stathistsub.unsubscribe()
      //   this.hvac.settingssub.unsubscribe()
      //   // this.hvac.modessub.unsubscribe()
      //   const result = await this.ds.clear_controller_override(this.hvac._id.$oid);
      //
      //   this.hvac.timer = setTimeout(() =>
      //     {
      //       this.auth.subscribeHomePage()
      //       this.auth.subscribeHvacPage(this.hvac)
      //
      //     },
      //     5000)
      //
      // }
      // else{
      //   this.hvac.status.ov = {}
      //   this.hvac.status.ov.adj = this.newovcount;
      //   clearTimeout(this.hvac.timer);
      //   this.hvac.stathistsub.unsubscribe()
      //   this.hvac.settingssub.unsubscribe()
      //   // this.hvac.modessub.unsubscribe()
      //
      //   const result = await this.ds.set_controller_override(this.hvac._id.$oid, {"dur_sec": this.hvac.settings.override_min, "adj": 0});
      //   this.hvac.timer = setTimeout(() =>
      //     {
      //       this.auth.subscribeHomePage()
      //       this.auth.subscribeHvacPage(this.hvac)
      //
      //     },
      //     5000)
      //
      // }
    }
    else{
      if (!this.hvac.status.ov){
        this.hvac.status.ov = {}
      }
      this.hvac.status.ov.adj = this.newovcount;
      // clearTimeout(this.hvac.timer);
      // this.hvac.stathistsub.unsubscribe()
      // this.hvac.settingssub.unsubscribe()
      // this.auth.location.timesubscription.unsubscribe()

      const result = await this.ds.set_controller_override(this.hvac._id.$oid, {"dur_sec": this.hvac.settings.override_min, "adj": this.newovcount});


    }
    this.auth.resumeSubscriptions()

    this.closeModal();


  }
  ngOnInit(){
    this.oldcsp = this.hvac.status.sp.c;
    this.oldhsp = this.hvac.status.sp.h;
    this.newcsp = this.hvac.status.sp.c;
    this.newhsp = this.hvac.status.sp.h;
    this.override_min = this.hvac.settings.override_min
    this.sp_adjustment_increment = this.hvac.settings.sp_adjustment_increment
    this.sp_max_adjustment = this.hvac.settings.sp_max_adjustment

    if (this.hvac.status.ov){
      this.newovcount = this.hvac.status.ov.adj;


    }
    if (!this.hvac.status.ov){
      for (let i of this.hvac.modes){
        if (i.name == "HIGH"){
          this.oldhsp = i.h_sp
          this.oldcsp = i.c_sp
          this.newhsp = i.h_sp
          this.newcsp = i.c_sp
        }
      }
    }
  }

  ionViewDidLoad() {
    // console.log('spedit ionViewDidLoad : '+JSON.stringify(this.hvac.overridesettings));
  }

  public closeModal(){
      // console.log('spedit : closeModal()');
      this.modalCtl.dismiss();
  }

}
