import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthLocalProvider } from './authenticate/authlocal';

import { IonicModule, ModalController } from '@ionic/angular';

// import { TestmodalPage } from '../testmodal/testmodal';
//
// import { SettingsComponent } from '../components/settings/settings.component';
// import { ScheduleComponent } from '../components/schedule/schedule.component';
// import { ScheduleItemComponent } from '../components/schedule-item/schedule-item.component';
//
// import { ControllerSchedulesComponent } from '../components/controller-schedules/controller-schedules.component'
// import { ControllerSettingsComponent } from '../components/controller-settings/controller-settings.component'
// import { ControllerModesComponent } from '../components/controller-modes/controller-modes.component'


@Injectable({
  providedIn: 'root'
})
export class PopupService {

    modalPage:any;
    modalOpen:boolean;

    constructor(
      public modalCtrl: ModalController
    ) {

    }

    public async openModal(modalInfo:any) {
      // data[0] = light
      // // data[1] = this.hvac;
      // data[1] = loc;
      var data:any = {};
      // data[0] = this.hvac.modes;
      // data[1] = this.hvac;
      // data[2] = this.navParams.data[0];
      // let modalInfo:any = {};

      // switch (type) {
      //     case 'schedules':
      //         modalInfo.component = ScheduleComponent;
      //         modalInfo.cssClass = 'schedules-modal-css';
      //         break;
      //
      //     case 'settings':
      //         modalInfo.component = SettingsComponent;
      //         modalInfo.cssClass = 'settings-modal-css';
      //         break;
      //
      //     case 'test':
      //
      //       // data.hvac = this.hvac;
      //       // data.location = this.location;
      //
      //       modalInfo.component = TestmodalPage;
      //       modalInfo.componentProps = data;
      //       break;
      //     case 'cschedules':
      //       // data.controller = this.hvac;
      //       // data.schedules = this.schedules;
      //       modalInfo.component = ControllerSchedulesComponent;
      //       modalInfo.componentProps = data;
      //       modalInfo.cssClass = 'schedule-modal-css';
      //
      //       break;
      //     case 'csettings':
      //       // data.controller = this.hvac;
      //       // data.schedules = this.schedules;
      //       modalInfo.component = ControllerSettingsComponent;
      //       modalInfo.componentProps = data;
      //       modalInfo.cssClass = 'settings-modal-css';
      //
      //       break;
      //     case 'cmodes':
      //       // data.controller = this.hvac;
      //       // data.schedules = this.schedules;
      //       modalInfo.component = ControllerModesComponent;
      //       modalInfo.componentProps = data;
      //       modalInfo.cssClass = 'modes-modal-css';
      //
      //       break;
      // }

      this.modalPage = await this.modalCtrl.create( modalInfo );

      // var modalPage = await this.modalCtrl.create({
      //   component: TestmodalPage,componentProps: data }
      // );
      this.modalPage.onDidDismiss().then(data=>{
        this.modalOpen = false;
        console.log(data)
      })
      // modalPage.onDidDismiss();
      await this.modalPage.present();
      this.modalOpen = true;
    }

    public isOpen() {
      return this.modalOpen;
    }
    public closePopup() {
      if (this.modalOpen) {
        this.modalPage.dismiss();
      }
    }

}
