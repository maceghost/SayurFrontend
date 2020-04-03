import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { UnityComponentsModule } from '../components/unity.components.module';
// import { KeyboardFormComponent } from '../keyboard-form/keyboard-form.component';
// import { KeypadFormComponent } from '../keypad-form/keypad-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
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
    LoginPage,
    // KeyboardFormComponent,
    // KeypadFormComponent
  ]
})
export class LoginPageModule {}
