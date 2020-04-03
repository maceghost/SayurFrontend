import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControllerSetupComponent } from './controller-setup.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerSetupComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControllerSetupComponent]
})
export class ControllerSetupComponentModule {}
