import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdjustmentComponent } from './adjustment.component';

const routes: Routes = [
  {
    path: '',
    component: AdjustmentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdjustmentComponent]
})
export class AdjustmentComponentModule {}
