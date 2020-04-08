import { Component, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';
import Keyboard from "simple-keyboard";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { KeyboardComponent } from '../../modals/keyboard/keyboard.component';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {

    @Input('parent') parent:any;
    @Input('schedule') schedule;
    @Input('controller') controller;
    @Input('action') action;
    @ViewChild('settingInput') settingInput:ElementRef;

    scheduleId:string;
    // action:any;
    selected = false;
    enabled = false;
    // modeSelected = false;
    modesExpanded = false;
    schedulesExpanded = true;
    controllerMode:string;

    selectedEdit = false;



    constructor(
      public ds: DataService,
      public auth: AuthLocalProvider,
      public dialog: MatDialog

    ) {
      // this.scheduleId = this.schedule._id.$oid;
      // if (this.controller.schedule && this.controller.schedule.mode == 'scheduled') {
      //   this.action = this.getMyScheduleAction();
      //   console.log('AssignScheduleComponent.ngInit() - action : , '+this.action);
      //
      // }


      // console.log('AssignScheduleComponent() - controller : , '+this.controller,' , schedule : ',this.schedule);
    }

    openDialog(setting: string,value:number) {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      // dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      dialogConfig.data = {controller:this.controller, setting:setting,value:value}
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.dialog.open(KeyboardComponent, dialogConfig);
      this.auth.pausesubs = true;


      modalDialog.afterClosed().subscribe(result => {
        console.log(this.action)
        console.log(result);
        console.log(setting)
        if (result){
          result.data = parseInt(result.data)
          switch (setting) {
            case 'level':

              this.action.extra = {level:result.data}
              break;
            case 'lm_threshold':
              this.action.extra = {lm_threshold:result.data}
              break;
            case 'match':
              this.action.extra = {lm_match:result.data}
              break;
            case 'lm_min':
              if (this.action.extra){
                if (this.action.extra.level){
                  delete this.action.extra.level
                }
                if (this.action.extra.lm_threshold){
                  delete this.action.extra.lm_threshold
                }
                if (this.action.extra.lm_match){
                  delete this.action.extra.lm_match
                }
                this.action.extra.lm_min = result.data
              }
              else{
                this.action.extra = {lm_min:result.data}
              }
              break;
            case 'lm_max':
              if (this.action.extra){
                if (this.action.extra.level){
                  delete this.action.extra.level
                }
                if (this.action.extra.lm_threshold){
                  delete this.action.extra.lm_threshold
                }
                if (this.action.extra.lm_match){
                  delete this.action.extra.lm_match
                }
                this.action.extra.lm_max = result.data
              }
              else{
                this.action.extra = {lm_max:result.data}
              }
              break;
            case 'lv_min':
              if (this.action.extra){
                if (this.action.extra.level){
                  delete this.action.extra.level
                }
                if (this.action.extra.lm_threshold){
                  delete this.action.extra.lm_threshold
                }
                if (this.action.extra.lm_match){
                  delete this.action.extra.lm_match
                }
                this.action.extra.lv_min = result.data
              }
              else{
                this.action.extra = {lv_min:result.data}
              }
              break;
            case 'lv_max':
              if (this.action.extra){
                if (this.action.extra.level){
                  delete this.action.extra.level
                }
                if (this.action.extra.lm_threshold){
                  delete this.action.extra.lm_threshold
                }
                if (this.action.extra.lm_match){
                  delete this.action.extra.lm_match
                }
                this.action.extra.lv_max = result.data
              }
              else{
                this.action.extra = {lv_max:result.data}
              }
              break;
          }
          console.log(this.action)
          this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
              console.log('set_controller_schedule returns : ',data);
              this.auth.resumeSubscriptions()
          }).catch((error) => {
              console.log(error);
          });
        }
      });
    }

    // openDialog(): void {
    //   const dialogRef = this.dialog.open(KeyboardComponent, {
    //     width: '250px',
    //     data: {controller: this.controller}
    //   });
    //
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(result);
    //   });
    // }
    // onChange = (input: string) => {
    //   this.value = input;
    //   console.log("Input changed", input);
    //   // if (this.editIndex) {
    //   //   switch (this.editIndex) {
    //   //     case -1:
    //   //       this.selectedSchedule.name = input;
    //   //       break;
    //   //     default:
    //   //       this.updateScheduleItem(input);
    //   //
    //   //
    //   //   }
    //   // }
    // };
    ngOnInit() {
      // console.log('AssignScheduleComponent.ngOnInit() -  controller : ',this.controller.schedule);
      // console.log('AssignScheduleComponent.ngOnInit() -  schedule : ',this.schedule);
      // console.log('AssignScheduleComponent.ngOnInit() -  controller : '+this.controller,' , schedule : ',this.schedule);

      this.scheduleId = this.schedule._id.$oid;
      // if (this.controller.schedule && this.controller.schedule.mode == 'scheduled') {
      //   this.action = this.getMyScheduleAction();
      //   console.log('AssignScheduleComponent.ngInit() - action : , '+this.action);
      //
      // }
      console.log(this.action)
      if (this.action){
        if (!this.action.extra){
          // this is for the html to be able to pass values to keyboard component
          this.action.extra = {}
        }
      }

    }


    // editValue(setting:string, value:number) {
    //
    //   // let setting = this.getSettingForIndex(idx);
    //     this.selectedEdit = true
    //     setTimeout(() => {
    //       this.simpleKeyboard = new Keyboard("#settingKeyboard",
    //             this.commonKeyboardOptions
    //       );
    //       this.settingInput.nativeElement.focus();
    //       this.simpleKeyboard.setInput(value);
    //       console.log("editSetting", this.simpleKeyboard);
    //     }, 200);
    //
    //
    // }
    // enterKey(value) {
    //   console.log('enterKey : ',value);
    //   this.selectedEdit.val = value;
    //   this.selectedEdit.touched = true;
    //   let settingItem:ControllerSettingsItemComponent = this.getSettingForIndex(this.selectedIndex);
    //   if (settingItem) {
    //     settingItem.update(value);
    //   }
    // }

    toggleOnOff() {
      this.auth.pausesubs = true;

      if (this.action.action == 'on') {
        this.action.action = 'off';
      } else {
        this.action.action = 'on'

      }
      console.log(this.action)
      console.log(this.controller.schedule)
      this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
          // console.log('set_controller_schedule returns : ',data);
          this.auth.resumeSubscriptions()
      }).catch((error) => {
          console.log(error);
      });
    }

    toggleSelected() {
      this.auth.pausesubs = true;

      // this.parent.setDirty();

      // i mean really might need to pause the subscriptions here in case while this is building the
      // object to send to the server one of the subcriptions comes in and overrites the value
      if (this.action) {
        this.removeScheduleAction();
      } else {
        this.action =
          {
            action: "off",
            schedule_id: this.scheduleId
          }
          this.controller.schedule.actions.push(this.action);
      }
      console.log(this.action)
      console.log(this.controller.schedule)
      this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
          // console.log('set_controller_schedule returns : ',data);
          this.auth.resumeSubscriptions()
      }).catch((error) => {
          console.log(error);
      });

    }

    removeScheduleAction() {
      let actions = this.controller.schedule.actions;
      let newactions = []
      for (let i of actions){
        if (this.scheduleId != i.schedule_id){
          newactions.push(i)
        }
      }
      this.controller.schedule.actions = newactions
      this.action = false
      // actions.forEach((action,index)=> {
      //   if (this.scheduleId == action.schedule_id) {
      //     console.log('removeScheduleAction removing : ',action);
      //     actions.slice(index);
      //     delete this.action;
      //   }
      // });

    }
    getScheduleableModes(){
      let newmodes = []
      for (let mode of this.controller.modes){
        if (mode.name != "SETBACK"){
          newmodes.push(mode)
        }
      }
      return newmodes
    }
    toggleEnabled() {
      this.enabled = !this.enabled;
      console.log('toggleEnabled : , '+this.selected);
    }

    toggleModes() {
      console.log('toggle modes : ',this.modesExpanded)
      this.modesExpanded = !this.modesExpanded;
    }
    onKeyPress = (button: string) => {
      // console.log("onKeyPress pressed", button, this.value);
      // if (button === "{enter}") {
      //    this.enterKey(this.value);
      // }
      // if (button === "{backspace}") {
      //   console.log('backspaced : ',this.value);
      //   this.simpleKeyboard.setInput(this.value);
      //   // if (this.value && this.value.length > 0) {
      //       // this.value = this.value.slice(0, -1);
      //       // console.log('backspace updating value : ',this.value);
      //       // this.simpleKeyboard.setInput(this.value);
      //       // console.log('backspaced : ',this.value);
      //   // }
      // }

      /**
       * If you want to handle the shift and caps lock buttons
       */
      // if (button === "{shift}" || button === "{lock}") this.handleShift();
    };
    onInputChange = (event: any) => {
      console.log('onInputChange : '+event.target.value);
      // this.value = event.target.value;
      // this.keyboard.setInput(event.target.value);

    };
    isAssigned(schedule) {
      let assigned = false;
      if (this.controller.schedule && this.controller.schedule.actions) {
        for (let action of this.controller.schedule.actions) {
          console.log('action : ',action);
           if (action.schedule_id == schedule.id ) {
             assigned = true;
             break;
           }
        }
      }
      return assigned;
    }

    assignSchedule(schedule, mode) {
      // a controller schedule can have just one action?
      let action:any = {};
      action.schedule_id = schedule.id;
      action.mode_name = mode.name;
      if (mode.name == 'setback') {
        action.action = 'off';
      } else {
        action.action = 'on';
      }
      console.log('assigning schedule : '+JSON.stringify(schedule)+' , action : '+JSON.stringify(action));
    }

    removeMode(mode) {

    }

    getMyScheduleAction() {
        // let scheduleId = this.schedule.id;
        let action:any;
        // console.log('getMyScheduleAction processing for schedule ',this.scheduleId);
        for (let a of this.controller.schedule.actions) {
            // console.log('getMyScheduleAction comparing action for schedule ',a.schedule_id);
            if (a.schedule_id == this.scheduleId) {
              // console.log('getMyScheduleAction found action : ',a);
              action = a;
            }
        }
        return action;
    }

    selectMode(mode) {
      // if (!this.action) {
      //   this.action = {};
      // }
      // this.action.action = "on";
      console.log(mode)
      this.auth.pausesubs = true;
      this.action.mode_name = mode.name.toLowerCase();
      this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
          // console.log('set_controller_schedule returns : ',data);
          this.auth.resumeSubscriptions()
      }).catch((error) => {
          console.log(error);
      });
    }

    // deselectMode(mode) {
    //     if (this.action.mode_name == mode.name) {
    //       return true;
    //     }
    //     return false;
    // }

    modeSelected(mode) {

        // console.log('ModeSelected : mode ', mode.name,' , action.mode : ',this.action);
        if (this.action.mode_name && mode.name) {
          if (this.action.mode_name.toUpperCase() == mode.name.toUpperCase()) {
            return true;
          }
        }
        return false;
    }

}
