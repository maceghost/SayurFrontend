import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
// import { Tab1aPage } from '../tab1a/tab1a.page'
// { path: 'devices', loadChildren: '../devices/devices.module#DevicesPageModule' },

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: '', redirectTo: 'home' },
        { path: 'home',
          children: [
             { path : '', loadChildren: '../home/home.module#HomePageModule' },
             { path: 'hvac', loadChildren: '../hvac/hvac.module#HvacPageModule', data : { 'back_button' : true } },
             { path: 'light', loadChildren: '../light/light.module#LightPageModule', data : { 'back_button' : true } },
             { path: 'map', loadChildren: '../map-icon/map-icon.module#MapIconPageModule', data : { 'back_button' : true } }
            ]},
        { path: 'devices', loadChildren: '../devices/devices.module#DevicesPageModule' },
        { path: 'gateway', loadChildren: '../gateway/gateway.module#GatewayPageModule' },
        { path: 'setup', loadChildren: '../setup/setup.module#SetupPageModule' },
        { path: 'status', loadChildren: '../status/status.module#StatusPageModule' }
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/home',
    pathMatch:'full'
  },
  // {
  //   path:'404',
  //   redirectTo:'/tabs/home',
  //   pathMatch:'full'
  // },
  // {
  //   path:'**',
  //   redirectTo:'/tabs/home',
  //   pathMatch:'full'
  // }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: TabsPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
