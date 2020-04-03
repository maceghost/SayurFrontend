import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DevicesPage } from './devices.page';
// import { UnityComponentsModule } from '../components/unity.components.module';
// import { DeviceViewComponentModule } from '../components/device-view/device-view.module';
// import { ControllerViewComponentModule } from '../components/controller-view/controller-view.module';
// import { DeviceViewComponentModule } from '../components/device-view/device-view.module';
// import { ControllerViewPageModule } from '../components/controller-view/controller-view.module';
// import { DeviceItemViewComponentModule } from '../device-item-view/device-item-view.module';
import { UnityComponentsModule } from '../components/unity.components.module';

const routes: Routes = [
  {
    path: '',
    component: DevicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnityComponentsModule,
    // DeviceItemViewComponentModule,
    // DeviceViewComponentModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ DevicesPage ]
})
export class DevicesPageModule {}
