import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HvacPage } from './hvac.page';
// import { SpeditPageModule } from '../spedit/spedit.module';
import { UnityComponentsModule } from '../components/unity.components.module';

const routes: Routes = [
  {
    path: '',
    component: HvacPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SpeditPageModule,
    UnityComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HvacPage]
})
export class HvacPageModule {}
