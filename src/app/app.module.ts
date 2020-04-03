import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLocalProvider } from './providers/authenticate/authlocal';
import { DataService } from './providers/data.service';
import { PopupService } from './providers/popup.service';

import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { MatListModule,MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTabsModule, MatRadioModule, MatTooltipModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DndModule } from 'ngx-drag-drop';

import { SpeditPageModule } from './spedit/spedit.module';
import { DevicePanelPageModule } from './device-panel/device-panel.module'
// import { SocketedViewComponentModule } from './socketed-view/socketed-view.module';
// import { DeviceItemViewComponent } from './device-item-view/device-item-view.component';
// import { ControllerSocketViewComponent } from './controller-socket-view/controller-socket-view.component'

// import { DeviceViewComponentModule } from './components/device-view/device-view.module'
// import { ControllerViewPageModule } from './components/controller-view/controller-view.module';
import { UnityComponentsModule } from './components/unity.components.module';
import { SettingsComponent } from './components/settings/settings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';

import { ControllerSchedulesComponent } from './components/controller-schedules/controller-schedules.component';
import { AssignScheduleComponent } from './components/assign-schedule/assign-schedule.component';

import { ControllerSettingsComponent } from './components/controller-settings/controller-settings.component'
import { ControllerModesComponent } from './components/controller-modes/controller-modes.component';
import { LightmodalComponent } from './components/lightmodal/lightmodal.component';
import { ListSelectionComponent } from './components/list-selection/list-selection.component';

import { NameComponent } from './components/name/name.component';

import { AdjustmentComponentModule } from './adjustment/adjustment.module';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { KeyboardComponent as KeyboardComponent } from './modals/keyboard/keyboard.component';
import { ModenamekeyboardComponent as ModenamekeyboardComponent } from './modals/modenamekeyboard/modenamekeyboard.component';
import { ListSelectComponent as ListSelectComponent } from './modals/list-select/list-select.component';
import { ListSelectorComponent } from './components/list-selector/list-selector.component';

import 'hammerjs';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    ModenamekeyboardComponent,
    ListSelectComponent,
    // ListSelectionComponent
  ],
  entryComponents: [
    SettingsComponent,
    ScheduleComponent,
    ScheduleItemComponent,
    ControllerSchedulesComponent,
    ControllerSettingsComponent,
    ControllerModesComponent,
    LightmodalComponent,
    KeyboardComponent,
    ModenamekeyboardComponent,
    NameComponent,
    ListSelectComponent,
    ListSelectionComponent,
    ListSelectorComponent,

   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FontAwesomeModule,
    SpeditPageModule,
    DevicePanelPageModule,
    DndModule,
    UnityComponentsModule,
    AdjustmentComponentModule,
    DragDropModule,
    NgIdleKeepaliveModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule
    // SocketedViewComponentModule,
    // DeviceViewComponentModule,
    // ControllerViewPageModule
    // DeviceItemViewComponent,
    // ControllerSocketViewComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthLocalProvider,
    DataService,
    PopupService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
