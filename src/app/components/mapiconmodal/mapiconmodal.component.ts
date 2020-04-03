import { Component } from '@angular/core';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';
import { NavController, NavParams, IonicModule, ModalController } from '@ionic/angular';

import * as moment from 'moment';

/**
 * Generated class for the LightmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'app-mapiconmodal',
  templateUrl: 'mapiconmodal.component.html',
  styleUrls: ['mapiconmodal.component.scss']
})
export class MapiconmodalComponent {

  editable:boolean = true;
  hvac:any;
  modes:any[];
  levelbool:boolean;
  level:number;
  changed:boolean;


  constructor(public auth: AuthLocalProvider, public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
    // super();
    // this.modes = _.orderBy(this.navParams.data[0], ['order'], ['asc'])
    //
    // for (let i of this.modes){
    //   i.editable = true;
    //   i.validentry = true
    //
    // }

  }
  toggle(){
    console.log(this.navParams.data[0].status.levelbool)
    this.levelbool = this.navParams.data[0].status.levelbool;
    if (this.levelbool){
      this.navParams.data[0].status.level = 100;
      this.navParams.data[0].status.color = "#ffe900"
    }
    else{
      this.navParams.data[0].status.level = 0;
      this.navParams.data[0].status.color = "darkgrey"
    }

    this.level = this.navParams.data[0].status.level;
    this.changed = true;
    if (!this.navParams.data[0].status.ov){
      this.navParams.data[0].status.ov = {}

    }
    this.navParams.data[0].status.ov.r = moment.utc(2700*1000).format('HH:mm:ss');

    this.auth.setLightOverride(1,this.level, this.navParams.data[1], this.navParams.data[0])
    .subscribe(

        data => {
          this.changed = false;
          // console.log(data)
        },
        error => {console.log(error);}
    )
  }
  range(){
    this.changed = true;
    console.log('here')
    this.level = this.navParams.data[0].status.level
    if (!this.level){
      this.navParams.data[0].status.color = "darkgrey"

    }

    if (!this.navParams.data[0].status.ov){
      this.navParams.data[0].status.ov = {}

    }
    this.navParams.data[0].status.ov.r = moment.utc(2700*1000).format('HH:mm:ss');
    this.auth.setLightOverride(1,this.level, this.navParams.data[1], this.navParams.data[0])
    .subscribe(

        data => {
          this.changed = false;
          // console.log(data)
        },
        error => {console.log(error);}
    )
  }
  quitov(){
    this.navParams.data[0].status.ov = null;
    // this.navParams.data[0].status.ov.r = moment.utc(this.navParams.data[0].status.dur*1000).format('HH:mm:ss');
    this.changed = true;

    this.auth.setLightOverride(0,0, this.navParams.data[1], this.navParams.data[0])
    .subscribe(

        data => {
          this.changed = false;
          // console.log(data)
        },
        error => {console.log(error);}
    )


    //
    //
    // if (this.newovcount == 0){
    //   if (this.hvac.status.ov){
    //
    //     // need to keep local variable uptodate for local logic
    //     this.hvac.status.ov.adj = this.newovcount;
    //
    //
    //     this.auth.setHvacOverride(0,this.newovcount, this.navParams.data[0], this.navParams.data[1])
    //     .subscribe(
    //
    //         data => {
    //
    //           // console.log(data)
    //         },
    //         error => {console.log(error);}
    //     )
    //   }
    //
    // }
    // else{
    //   if (!this.hvac.status.ov){
    //     this.hvac.status.ov = {}
    //   }
    //   this.hvac.status.ov.adj = this.newovcount;
    //
    //   this.auth.setHvacOverride(1,this.newovcount, this.navParams.data[0], this.navParams.data[1])
    //   .subscribe(
    //
    //       data => {
    //
    //         console.log(data)
    //       },
    //       error => {console.log(error);}
    //   )
    // }
    // this.hvac.status.sp.h = this.newhsp;
    // this.hvac.status.sp.c = this.newcsp;
    // this.editable = true;
    // this.editbuttons = false;

  }

  public closeModal(){
      this.modalCtrl.dismiss();
      // this.viewCtrl.dismiss();
  }

  // editsp(mode: any){
  //   mode.editable = false;
  //   mode.newhsp = mode.h_sp;
  //   mode.newcsp = mode.c_sp;
  //   mode.newfan = mode.fan;
  //   mode.newfc = mode.fc_only
  //   mode.newset = mode.setback
  // }
  // exitsp(mode:any){
  //   mode.editable = true;
  //
  // }
  // savesp(mode:any){
  //   if (mode.newhsp > mode.newcsp || mode.newcsp - mode.newhsp <2 ){
  //     mode.validentry = false
  //   }
  //
  //   else{
  //     mode.validentry = true
  //     mode.heathigher = false
  //     mode.small = false
  //     let changes = {}
  //     changes.h_sp = mode.newhsp
  //     changes.c_sp = mode.newcsp
  //     changes.fan = mode.newfan
  //     changes.fc_only = mode.newfc
  //     changes.setback = mode.newset
  //     this.auth.setHvacSetting(changes, this.navParams.data[1], this.navParams.data[2])
  //     .subscribe(
  //
  //         data => {
  //
  //           console.log(data)
  //         },
  //         error => {console.log(error);}
  //     )
  //     mode.h_sp = mode.newhsp
  //     mode.c_sp = mode.newcsp
  //     mode.fan = mode.newfan
  //     mode.fc_only = mode.newfc
  //     mode.setback = mode.newset
  //     mode.editable = true;
  //
  //   }
  //   // this.editable = true;
  // }
  // addval(mode: any, field: string){
  //   if (field == 'heat'){
  //     mode.newhsp += 1;
  //   }
  //   if (field == 'cool'){
  //     mode.newcsp += 1;
  //   }
  //   if (field == 'fan'){
  //     mode.newfan += 1;
  //   }
  //
  // }
  // subval(mode: any, field: string){
  //   if (field == 'heat'){
  //     mode.newhsp -= 1;
  //   }
  //   if (field == 'cool'){
  //     mode.newcsp -= 1;
  //   }
  //   if (field == 'fan'){
  //     mode.newfan -= 1;
  //   }
  // }
  //
  // ionViewDidLoad() {
  //   console.log(this.navParams);
  //
  // }

}
