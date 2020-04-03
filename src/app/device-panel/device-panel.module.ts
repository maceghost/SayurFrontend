import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DevicePanelPage } from './device-panel.page';
// import { DeviceItemViewComponentModule } from '../device-item-view/device-item-view.module'
// import { ControllerSocketViewComponentModule } from '../controller-socket-view/controller-socket-view.module';
// import { DeviceItemViewComponentModule } from '../device-item-view/device-item-view.module';
// import { DeviceViewComponentModule } from '../components/device-view/device-view.module';
// import { ControllerViewPageModule } from '../components/controller-view/controller-view.module';
import { UnityComponentsModule } from '../components/unity.components.module';

import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DevicePanelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    UnityComponentsModule,
    // DeviceViewPageModule,
    // ControllerViewPageModule,
    // DeviceViewComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ DevicePanelPage ]
})
export class DevicePanelPageModule {}
