import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControllerDetailComponent } from './controller-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControllerDetailComponent]
})
export class ControllerDetailComponentModule {}
