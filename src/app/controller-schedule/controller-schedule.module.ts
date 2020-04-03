import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControllerScheduleComponent } from './controller-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerScheduleComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControllerScheduleComponent]
})
export class ControllerScheduleComponentModule {}
