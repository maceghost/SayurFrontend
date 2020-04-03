import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SitesPage } from './sites.page';
import { UnityComponentsModule } from '../components/unity.components.module';
import { PipesModule } from '../../pipes/pipes.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';




// import { KeyboardFormComponent } from '../keyboard-form/keyboard-form.component';
// import { KeypadFormComponent } from '../keypad-form/keypad-form.component';

const routes: Routes = [
  {
    path: '',
    component: SitesPage
  }
];

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UnityComponentsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [
    SitesPage,
    // KeyboardFormComponent,
    // KeypadFormComponent
  ]
})
export class SitesPageModule {}
