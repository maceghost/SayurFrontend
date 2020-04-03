import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapIconPage } from './map-icon.page';
import { MatTabsModule } from '@angular/material';
import { UnityComponentsModule } from '../components/unity.components.module';

const routes: Routes = [
  {
    path: '',
    component: MapIconPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    UnityComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ MapIconPage ]
})
export class MapIconPageModule {}
