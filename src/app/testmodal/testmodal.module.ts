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
import { TestmodalPage } from './testmodal';

const routes: Routes = [
  {
    path: '',
    component: TestmodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SpeditPage,
    RouterModule.forChild(routes)
  ],
  declarations: [ TestmodalPage ]
})
export class TestmodalPageModule {}
