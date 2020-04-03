import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
// import * as moment from 'moment';
// import * as lodash from 'lodash';

/**
 * Generated class for the LocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-location',
  templateUrl: 'location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {

  text: string;
  @Input() loc: any;
  pushPage: any = "LocationPage";
  hvacpage: any = "HvacPage";
  @Output() lightselected: EventEmitter<any> = new EventEmitter<any>();
  @Output() returnedemit: EventEmitter<any> = new EventEmitter<any>();
  subscription: any;
  @Output() leaveToLoc: EventEmitter<any> = new EventEmitter<any>();
  @Output() leaveToHvac: EventEmitter<any> = new EventEmitter<any>();
  returned: boolean = false;



  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private auth: AuthenticateProvider) {

  }



  ngOnInit(){
    this.loc.capname = this.loc.name.toUpperCase();


  }
  // openModal(light: any, loc: any){
  //   for (let location of this.auth.locations){
  //     this.auth.unsubscribeLoc(location)
  //   }
  //
  //   var data = []
  //   data[0] = light
  //   data[1] = loc;
  //   var modalPage = this.modalCtrl.create('LightmodalPage', data);
  //   this.auth.locsubpaused = true
  //
  //
  //   modalPage.onDidDismiss((newdata) => {
  //     if (this.auth.page == 'home'){
  //       this.auth.unsubscribeLocFromLoc(loc)
  //
  //       this.lightselected.emit(false)
  //       this.auth.locsubpaused = false
  //       let complete = true
  //       for (let myloc of this.auth.locations) {
  //
  //         if (!myloc.returned){
  //
  //           complete = false
  //           console.log('1')
  //           this.auth.getLoc(myloc)
  //         }
  //
  //       }
  //       if (complete){
  //         let timeElapsed = Date.now() - this.auth.roundstart
  //         if (timeElapsed < 30000){
  //           setTimeout(() =>
  //             {
  //               this.auth.roundstart = null
  //               for (let myloc of this.auth.locations){
  //                   myloc.returned = false
  //                   console.log('2')
  //
  //                   this.auth.getLoc(myloc)
  //               }
  //             },
  //             (30000 - timeElapsed))
  //         }
  //         else{
  //           this.auth.roundstart = null
  //
  //           for (let myloc of this.auth.locations){
  //               myloc.returned = false
  //               console.log('3')
  //               this.auth.getLoc(myloc)
  //           }
  //         }
  //
  //       }
  //
  //     }
  //
  //
  //
  //
  //   });
  //   modalPage.present();
  //   this.lightselected.emit(true)
  // }
  gotoloc(){

    console.log('boom')
    this.leaveToLoc.emit(true)

  }
  gotohvac(){

    this.leaveToHvac.emit(true)
  }

}
