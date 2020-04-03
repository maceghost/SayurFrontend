import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';

// import { ViewController } from '@ionic/angular';
import * as _ from 'lodash';

/**
 * Generated class for the TestmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-testmodal',
  templateUrl: 'testmodal.html',
})
export class TestmodalPage {

  editable:boolean = true;
  hvac:any;
  location:any;
  // hvac:any = this.navParams.data[0];
  // modes:any[] = _.orderBy(this.hvac.modes, ['order'], ['asc']);


  // public viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams
  constructor(private auth: AuthLocalProvider ) {

    // this.modes = _.orderBy(this.hvac.modes, ['order'], ['asc'])

    // for (let i of this.hvac.modes){
    //   i.editable = true;
    //   i.validentry = true
    //
    // }

  }
  public closeModal(){
      // this.viewCtrl.dismiss();
  }

  editsp(mode: any){
    mode.editable = false;
    mode.newhsp = mode.h_sp;
    mode.newcsp = mode.c_sp;
    mode.newfan = mode.fan;
    mode.newfc = mode.fc_only
    mode.newset = mode.setback
  }
  exitsp(mode:any){
    mode.editable = true;
    mode.validentry = true;
  }
  savesp(mode:any){
    if (mode.newhsp > mode.newcsp || mode.newcsp - mode.newhsp <2 ){
      mode.validentry = false
    }

    else{
      mode.validentry = true
      mode.heathigher = false
      mode.small = false
      let changes = {h_sp:'',c_sp:'',fan:'',fc_only:'',setback:'', mode:''}
      changes.h_sp = mode.newhsp
      changes.c_sp = mode.newcsp
      changes.fan = mode.newfan
      changes.fc_only = mode.newfc
      changes.setback = mode.newset
      console.log(mode.order)
      changes.mode = mode.id

      // this.auth.setHvacSetting(changes, this.hvac, this.navParams.data[1])
      this.auth.setHvacSetting(changes, this.hvac, this.location)
      .subscribe(

          data => {

          },
          error => {console.log(error);}
      )
      mode.h_sp = mode.newhsp
      mode.c_sp = mode.newcsp
      mode.fan = mode.newfan
      mode.fc_only = mode.newfc
      mode.setback = mode.newset
      mode.editable = true;

    }
    // this.editable = true;
  }
  addval(mode: any, field: string){
    if (field == 'heat'){
      mode.newhsp += 1;
    }
    if (field == 'cool'){
      mode.newcsp += 1;
    }
    if (field == 'fan'){
      mode.newfan += 1;
    }

  }
  subval(mode: any, field: string){
    if (field == 'heat'){
      mode.newhsp -= 1;
    }
    if (field == 'cool'){
      mode.newcsp -= 1;
    }
    if (field == 'fan'){
      mode.newfan -= 1;
    }
  }

  ionViewDidLoad() {
    // console.log(this.navParams);

  }

}
