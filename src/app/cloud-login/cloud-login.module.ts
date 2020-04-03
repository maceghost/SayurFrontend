import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CloudLoginPage } from './cloud-login.page';
import { UnityComponentsModule } from '../components/unity.components.module';
// import { KeyboardFormComponent } from '../keyboard-form/keyboard-form.component';
// import { KeypadFormComponent } from '../keypad-form/keypad-form.component';

const routes: Routes = [
  {
    path: '',
    component: CloudLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnityComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CloudLoginPage,
    // KeyboardFormComponent,
    // KeypadFormComponent
  ]
})
export class CloudLoginPageModule {}
