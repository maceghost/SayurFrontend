import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceConversionComponent } from './device-conversion.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceConversionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceConversionComponent]
})
export class DeviceConversionComponentModule {}
