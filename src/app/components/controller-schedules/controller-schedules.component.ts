import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DataService } from '../../providers/data.service';
import { AssignScheduleComponent } from '../assign-schedule/assign-schedule.component';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';


@Component({
  selector: 'app-controller-schedules',
  templateUrl: './controller-schedules.component.html',
  styleUrls: ['./controller-schedules.component.scss'],
})
export class ControllerSchedulesComponent implements OnInit {

  @Input('controller') controller:any;
  @ViewChildren(AssignScheduleComponent) private assignScheduleList: QueryList<AssignScheduleComponent>;
  schedules:any [];
  dirty = false;

  constructor(
    public ds: DataService,
    public viewCtrl: ModalController,
    public auth: AuthLocalProvider


  ) {
  }

  getActionForSchedule(schedule: any ){
    // let scheduleId = this.schedule.id;
    let action:any;
    // console.log('getMyScheduleAction processing for schedule ',this.scheduleId);
    for (let a of this.controller.schedule.actions) {
        // console.log('getMyScheduleAction comparing action for schedule ',a.schedule_id);
        if (a.schedule_id == schedule._id.$oid) {
          // console.log('getMyScheduleAction found action : ',a);
          action = a;
        }
    }
    return action;

  }

  ngOnInit() {
    console.log('ControllerSchedulesComponent() controller : ',this.controller);

    this.ds.get_schedules().then((data:any) => {
        console.log('get_schedules returns : ',data);
        this.schedules = data;
    }).catch((error) => {
        console.log(error);
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  scheduleMode() {
     let mode = 'off';
     if (this.controller.schedule) {
       switch (this.controller.schedule.mode) {
        case 'always off':
          mode = 'off';
          break;
        case 'always on':
          mode = 'on';
          break;
        case 'scheduled':
          mode = 'scheduled';
          break;
       }
     }
     return mode;
  }

  setScheduleMode(mode) {
    if (!this.controller.schedule) {
      this.controller.schedule = {}
    }
    switch (mode) {
      // i mean really might need to pause the subscriptions here in case while this is building the
      // object to send to the server one of the subcriptions comes in and overrites the value
      case 'off':
        if (this.controller.schedule.mode != 'always off'){
          this.controller.schedule.mode = 'always off';
          this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
              console.log('set_controller_schedule returns : ',data);
          }).catch((error) => {
              console.log(error);
          });
        }
        break;
      case 'on':
        if (this.controller.schedule.mode != 'always on'){
          this.controller.schedule.mode = 'always on';
          this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
              console.log('set_controller_schedule returns : ',data);
          }).catch((error) => {
              console.log(error);
          });
        }
        break;
      case 'scheduled':
        if (this.controller.schedule.mode != 'scheduled'){
          this.controller.schedule.mode = 'scheduled';
          this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then((data:any) => {
              console.log('set_controller_schedule returns : ',data);
          }).catch((error) => {
              console.log(error);
          });
        }
        break;
    }
  }

  setDirty() {
    this.dirty = true;
  }

  saveController() {
    console.log('save controller');
    this.dirty = false;
    // collect all the schedule actions and call ds.set_controller_schedule
    let actions = [];
    this.assignScheduleList.forEach( (assignSchedule ) => {
      if (assignSchedule.action) {
        console.log('assignSchedule', assignSchedule);
        actions.push(assignSchedule.action);
      }
      this.controller.schedule.actions = actions;
      this.ds.set_controller_schedule(this.controller._id.$oid, this.controller.schedule).then(data => {
        console.log('set_controller_schedule - success : ',data);
      }).catch(error => {
        console.log('set_controller_schedule - error : ',error);
      })
    });
  }
  scheduled() {
    let scheduled = false;
    if (this.controller && this.controller.schedule) {
       let s = this.controller.schedule;
       if (s.mode && s.mode =='scheduled') {
         return true;
       }
    }
    return scheduled;
  }
}
