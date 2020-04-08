import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF, PlatformLocation } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeviceViewComponent } from './device-view/device-view.component';
import { ControllerViewComponent } from './controller-view/controller-view.component';
import { ControllerSocketViewComponent } from './controller-socket-view/controller-socket-view.component';

import { SocketedViewComponent } from './socketed-view/socketed-view.component';
import { DeviceItemViewComponent } from './device-item-view/device-item-view.component';
import { SettingsComponent } from './settings/settings.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ControllerSchedulesComponent } from './controller-schedules/controller-schedules.component';
import { ControllerSettingsComponent } from './controller-settings/controller-settings.component';
import { ControllerSettingsItemComponent } from './controller-settings-item/controller-settings-item.component';

import { ControllerModeComponent } from './controller-mode/controller-mode.component';
import { ControllerModesComponent } from './controller-modes/controller-modes.component';

import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { AssignLightScheduleComponent } from './assign-light-schedule/assign-light-schedule.component';

import { KeyboardFormComponent } from './keyboard-form/keyboard-form.component';
import { KeypadFormComponent } from './keypad-form/keypad-form.component';
import { LightmodalComponent } from './lightmodal/lightmodal.component';
import { ListSelectionComponent } from './list-selection/list-selection.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { LocationComponent } from './location/location.component';
import { TestComponent } from './test/test.component';


import { MapiconmodalComponent } from './mapiconmodal/mapiconmodal.component';
import { MatListModule,MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTabsModule, MatRadioModule, MatFormFieldModule,MatSelectModule } from '@angular/material';

import { HistoryComponent } from './history/history.component';
import { NameComponent } from './name/name.component';
import { SearchkeyboardComponent } from './searchkeyboard/searchkeyboard.component';

import { DndModule } from 'ngx-drag-drop';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      DndModule,
      MatCardModule, MatListModule,MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTabsModule, MatRadioModule,MatFormFieldModule,MatSelectModule
  ],
  declarations: [
      DeviceViewComponent,
      ControllerViewComponent,
      SocketedViewComponent,
      DeviceItemViewComponent,
      ControllerSocketViewComponent,
      AssignScheduleComponent,
      AssignLightScheduleComponent,
      ControllerSchedulesComponent,
      ControllerSettingsComponent,
      ScheduleComponent,
      ScheduleItemComponent,
      SettingsComponent,
      ControllerModeComponent,
      ControllerModesComponent,
      ControllerSettingsItemComponent,
      KeyboardFormComponent,
      KeypadFormComponent,
      LightmodalComponent,
      ListSelectionComponent,
      MapiconmodalComponent,
      HistoryComponent,
      NameComponent,
      ListSelectorComponent,
      SearchkeyboardComponent,
      LocationComponent,
      TestComponent
  ],
  exports: [
    DeviceViewComponent,
    ControllerViewComponent,
    SocketedViewComponent,
    AssignScheduleComponent,
    ControllerSchedulesComponent,
    DeviceItemViewComponent,
    ControllerSocketViewComponent,
    ControllerSettingsComponent,
    KeyboardFormComponent,
    ControllerSettingsItemComponent,
    KeypadFormComponent,
    HistoryComponent,
    ControllerModesComponent,
    NameComponent,
    ListSelectionComponent,
    ListSelectorComponent,
    SearchkeyboardComponent,
    LocationComponent,
    TestComponent

  ]
})
export class UnityComponentsModule {}
