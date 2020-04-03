import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';



@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrls: ['./assign-schedule.component.scss'],
})
export class AssignScheduleComponent implements OnInit {

    @Input('parent') parent:any;
    @Input('schedule') schedule;
    @Input('controller') controller;
    @Input('action') action;

    scheduleId:string;
    // action:any;
    selected = false;
    enabled = false;
    // modeSelected = false;
    modesExpanded = false;
    schedulesExpanded = true;
    controllerMode:string;

    constructor(
      public ds: DataService,
      public auth: AuthLocalProvider

    ) {
      // this.scheduleId = this.schedule._id.$oid;
      // if (this.controller.schedule && this.controller.schedule.mode == 'scheduled') {
      //   this.action = this.getMyScheduleAction();
      //   console.log('AssignScheduleComponent.ngInit() - action : , '+this.action);
      //
      // }


      // console.log('AssignScheduleComponent() - controller : , '+this.controller,' , schedule : ',this.schedule);
    }

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
    }

    toggleOnOff() {
      this.auth.pausesubs = true;

      if (this.action.action == 'on') {
        this.action.action = 'off';
      } else {
        this.action.action = 'on'
        for (let mode of this.controller.modes){
          if (mode.order == 1){
            this.action.mode_name = mode.name.toLowerCase()
          }
        }
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
