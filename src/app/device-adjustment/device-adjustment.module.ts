import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceAdjustmentComponent } from './device-adjustment.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceAdjustmentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceAdjustmentComponent]
})
export class DeviceAdjustmentComponentModule {}
