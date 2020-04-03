import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceDampeningComponent } from './device-dampening.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceDampeningComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceDampeningComponent]
})
export class DeviceDampeningComponentModule {}
