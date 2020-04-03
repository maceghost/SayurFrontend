import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapIconDetailComponent } from './map-icon-detail.component';
import { MatTabsModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: MapIconDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapIconDetailComponent]
})
export class MapIconDetailComponentModule {}
