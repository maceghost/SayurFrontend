// import { NgModule } from '@angular/core';
// import { IonicPageModule } from 'ionic-angular';
// import { SpeditPage } from './spedit';
//
// @NgModule({
//   declarations: [
//     SpeditPage,
//   ],
//   imports: [
//     IonicPageModule.forChild(SpeditPage),
//   ],
// })
// export class SpeditPageModule {}
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpeditPage } from './spedit';

const routes: Routes = [
  {
    path: '',
    component: SpeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    // SpeditPage,
    RouterModule.forChild(routes)
  ],
  declarations: [SpeditPage]
})
export class SpeditPageModule {}
