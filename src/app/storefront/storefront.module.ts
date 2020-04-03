import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorefrontPage } from './storefront.page';
import { UnityComponentsModule } from '../components/unity.components.module';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
// import { KeyboardFormComponent } from '../keyboard-form/keyboard-form.component';
// import { KeypadFormComponent } from '../keypad-form/keypad-form.component';

const routes: Routes = [
  {
    path: '',
    component: StorefrontPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnityComponentsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    // MatSort,
    // MatTableDataSource,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StorefrontPage,
    // KeyboardFormComponent,
    // KeypadFormComponent
  ]
})
export class StorefrontPageModule {}
