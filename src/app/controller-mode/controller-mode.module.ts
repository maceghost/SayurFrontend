import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControllerModeComponent } from './controller-mode.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerModeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControllerModeComponent]
})
export class ControllerModeComponentModule {}
