import { Component, OnInit, ViewChildren, ViewChild, QueryList, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ScheduleItemComponent } from '../schedule-item/schedule-item.component';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../providers/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumeric } from "rxjs/util/isNumeric"
import Keyboard from "simple-keyboard";

declare var require: any;
let moment = require('moment');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {

  @ViewChild('scheduleInput') scheduleInput:any;
  @ViewChildren('scheduleItem') private scheduleItems:QueryList<ScheduleItemComponent>;

  schedules:any [];

  editing = false;
  timeFormGroup:FormGroup;
  lastIndex=-1;
  lastElement:any;
  selectedSchedule:any;
  editType="text";
  placeholder="Enter Day Time";

  touched = false;
  nameTouched = false;
  weekdaysTouched = false;
  capslock = false;

  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
          default: [
             '1 2 3 4 5 6 7 8 9 0 -',
             'q w e r t y u i o p {backspace}',
             '{capslock} a s d f g h j k l {enter}',
             '{shiftleft} {space} z x c v b n m .'
          ],
          shift: [
            '1 2 3 4 5 6 7 8 9 0 -',
            'Q W E R T Y U I O P {backspace}',
            '{capslock} A S D F G H J K L {enter}',
            '{shiftleft} {space} Z X C V B N M'
          ]
      },
      display: {
         "{escape}": "esc ⎋",
         "{tab}": "⇥",
         "{backspace}": "⌫",
         "{enter}": "↵",
         "{capslock}": "⇪",
         "{shiftleft}": "⇧",
         "{shiftright}": "⇧",
         "{controlleft}": "ctrl ⌃",
         "{controlright}": "ctrl ⌃",
         "{space}": "␣",
         "{altleft}": "alt ⌥",
         "{altright}": "alt ⌥",
         "{metaleft}": "cmd ⌘",
         "{metaright}": "cmd ⌘"
      },
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
  };

  simpleKeyboard:Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;
  value="";

  editIndex:number;

  constructor(
    public ds: DataService,
    public viewCtrl: ModalController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadScheduleData();
  }

  loadScheduleData() {
    this.ds.get_schedules().then((data:any) => {
        console.log('get_schedules : '+ JSON.stringify(data));
        this.schedules = data;
    }).catch((error) => {
        console.log(error);
    });
  }

  ngAfterViewInit() {
    // this.simpleKeyboard = new Keyboard("#scheduleKeyboard",
    //       this.commonKeyboardOptions
    // );
  }

  close() {
    this.removeKeyboard();
    this.loadScheduleData();
    this.viewCtrl.dismiss();

  }

  closeSelected() {
    delete this.selectedSchedule;
    this.removeKeyboard();
    this.loadScheduleData();

  }

  remove(event, schedule) {
    event.stopPropagation();
    console.log('remove : ',schedule);
    let id = schedule._id.$oid;
    this.ds.remove_schedule(id).then((data:any) => {
        console.log('remove_schedule : ', data);
        this.loadScheduleData();
        this.refresh();
        // this.schedules = data;
    }).catch((error) => {
        console.log(error);
    });
  }

  edit(schedule) {
    console.log('remove : ',schedule);
  }


  testLeave(event, idx) {

    let currentItem:ScheduleItemComponent = this.getScheduleItemByIndex(idx);
    let currentElement = currentItem.time.nativeElement;
    console.log('test leave - '+'event: '+JSON.stringify(event)+' , currentElement : '+currentElement+', idx: '+idx);
    if (this.lastIndex && this.lastIndex >= 0) {
      if (idx != this.lastIndex) {
        // user left without hitting enter
        let lastItem:ScheduleItemComponent = this.getScheduleItemByIndex(this.lastIndex);
        if (lastItem) {
          let newValue = lastItem.data;
          console.log('lastItem : '+JSON.stringify(lastItem.data));
          // let element = lastItem.time.nativeElement;
          // isValid = moment(lastItem.data.time,"HH:mm", true).isValid()
          let tValue;
          if (newValue.indexOf(':')) {
            tValue = moment(newValue,"HH:mm");
            // tValue = moment(newValue,"HH:mm", true);
            // isValid = moment(newValue,"HH:mm", true).isValid()
          } else {
            tValue = moment(newValue,"HHmm");
            // tValue = moment(newValue,"HHmm", true);
            // isValid = moment(newValue,"HHmm", true).isValid()
          }
          let isValid = tValue.isValid();


          if (isValid) {
            lastItem.data.time = moment('07:00',"HH:mm");
            this.lastElement.value = '07:00';
          } else {
            console.log('setting time to : '+tValue);
            this.lastElement.value = tValue.format("HH:mm");
          }
          lastItem.refresh();
          this.lastIndex = idx;
          this.lastElement = currentElement;
        }
      }
    } else {
      this.lastIndex = idx;
      this.lastElement = currentElement;
    }
  }

  getScheduleItemByIndex(idx) {

    let scheduleItem;
    let results = this.scheduleItems.toArray();

    if (results && results.length > 0) {
      console.log('found schedule items : ',results.length);
      results.forEach((si) => {
        if (si.idx == idx) {
          scheduleItem = si;
        }
      });
     // scheduleItem = results[idx];
    }
    console.log('getScheduleItemByIndex returning - scheduleItem : '+scheduleItem+' , for index : '+idx);
    return scheduleItem;

  }

  editSchedule(schedule) {
    this.selectedSchedule = schedule;
    // this.editing = true;
    setTimeout(() => {
      this.simpleKeyboard = new Keyboard("#scheduleKeyboard",
            this.commonKeyboardOptions
      );
      console.log("editSchedule", this.simpleKeyboard);
    }, 200);
  }

  removeKeyboard() {
    if (this.simpleKeyboard) {
      this.simpleKeyboard.destroy();
      delete this.simpleKeyboard;
    }
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {

    console.log("onKeyPress pressed", button, this.value);
    if (button === "{enter}") {
       this.enterKey(this.value);
    }

     if (button === "{backspace}") {
       console.log('backspaced : ',this.value);
       this.simpleKeyboard.setInput(this.value);
     }


    if (button === "{capslock}") {
      this.capslock = !this.capslock;
      if (this.capslock) {
        this.simpleKeyboard.setOptions({
          layoutName: "shift"
        });
      } else {
        this.simpleKeyboard.setOptions({
          layoutName: "default"
        });
      }
    }
    if (button === "{shiftleft}") {
      if ('shift' === this.simpleKeyboard.options.layoutName) {
        this.simpleKeyboard.setOptions({
          layoutName: "default"
        });
      } else {
        this.simpleKeyboard.setOptions({
          layoutName: "shift"
        });
      }
    } else {
      console.log('not shiftleft');
      if ('shift' === this.simpleKeyboard.options.layoutName) {
          console.log('layout already shift');
          if (!this.capslock) {
            console.log('capslock not set');
            this.simpleKeyboard.setOptions({
              layoutName: "default"
            });
          }
      }
    }

    // } || button === "{capslock}") this.handleShift();


  };

  onInputChange = (event: any) => {
    console.log('onInputChange : '+event.target.value);
    this.value = event.target.value;
    // this.keyboard.setInput(event.target.value);

  };

  handleShift = () => {
    let currentLayout = this.simpleKeyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.simpleKeyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  enterKey(value) {
    console.log('enterKey : ',value);
    if (isNumeric(this.editIndex)) {
      switch (this.editIndex) {
        case 99:
          this.selectedSchedule.name = value;
          this.selectedSchedule.nameTouched = true;
          console.log('enterKey : ',this.value);
          // this.refresh();
          break;
        default:
          this.updateScheduleItem(value);
          this.selectedSchedule.weekdaysTouched = true;
          break;
      }
      this.selectedSchedule.touched = true;
    } else {
      console.log('editIndex is null');
    }
  }

  editNameField(event:any) {
    console.log('editing name : ');
    this.value = this.selectedSchedule.name;
    this.editIndex = 99;
    this.scheduleInput.nativeElement.focus();
    // let selectedInput = `#${event.target.id}`;
    //
    // this.simpleKeyboard.setOptions({
    //     inputName: selectedInput
    // });
  }

  editInputField(idx) {
    console.log('editing time field : ',idx);
    this.editIndex = idx;
    let data = this.selectedSchedule.weekday_defaults[idx];
    this.value = data;
    this.simpleKeyboard.setInput(this.value);
    this.scheduleInput.nativeElement.focus();
    // let scheduleItem:ScheduleItemComponent = this.scheduleItems.toArray[this.editIndex];
    // if (scheduleItem) {
    //     this.value = scheduleItem.data;
    //     console.log('scheduleItem null');
    // } else {
    //   console.log('scheduleItem null');
    // }

    // let selectedInput = `#${event.target.id}`;
    //
    // this.simpleKeyboard.setOptions({
    //     inputName: selectedInput
    // });
  }

  updateScheduleItem(value) {

    console.log('updateScheduleItem : ',this.editIndex);
    // this.selectedSchedule.weekday_defaults[this.editIndex] = value;
    let scheduleItem:ScheduleItemComponent = this.getScheduleItemByIndex(this.editIndex);
    // let scheduleItem:ScheduleItemComponent = this.scheduleItems.toArray[this.editIndex];
    if (scheduleItem) {
        console.log('setting scheduleItem to touched');
        scheduleItem.time.nativeElement.focus();
        setTimeout(() => {
          // scheduleItem.time.nativeElement.classList.add('touched');
          // this.selectedSchedule.weekday_defaults[this.editIndex] = value;
          scheduleItem.updateData(value);
          scheduleItem.refresh();
        }, 200);
    } else {
      console.log('scheduleItem not found');
    }

  }

  refresh() {
    setTimeout(() => {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }, 100);

  }

  itemSelected(idx) {
    if (this.selectedSchedule && this.editIndex == idx) {
        return true;
    }
    return false;
  }

  nameSelected() {
    if (this.selectedSchedule && this.editIndex == 99) {
        return true;
    }
    return false;
  }

  save() {
      if (this.selectedSchedule.nameTouched) {
        this.ds.set_schedule_name(this.selectedSchedule._id.$oid, this.selectedSchedule.name).then((data:any) => {
            console.log('set_schedule_name : ', data);
            // this.schedules = data;
        }).catch((error) => {
            console.log(error);
        });
      }
      if (this.selectedSchedule.weekdaysTouched) {
        let ary = [];
        for (let i=0; i < this.selectedSchedule.weekday_defaults.length; i++) {
          let si = this.getScheduleItemByIndex(i);
          let d = si.getData();
          console.log('saving week day data : ',d);
          ary.push(d);
        }
        this.ds.set_schedule_weekday_defaults(this.selectedSchedule._id.$oid, ary).then((data:any) => {
            console.log('set_schedule_weekday_defaults : ', data);
            // this.schedules = data;
        }).catch((error) => {
            console.log(error);
        });
      }
    this.selectedSchedule.touched = false;
    this.selectedSchedule.nameTouched = false;
    this.selectedSchedule.weekdaysTouched = false;
    delete this.selectedSchedule;
    this.value = "";
    this.removeKeyboard();
    this.loadScheduleData();

  }

  addSchedule() {
    console.log('add schedule');
    // let schedule:any = {};
    // schedule.name = "New Schedule";
    // schedule.weekday_defaults = [
    //   "08:00",
    //   "08:00",
    //   "08:00",
    //   "08:00",
    //   "08:00",
    //   "08:00",
    //   "08:00"
    // ];
    // let end = this.schedules.push(schedule);
    // this.editSchedule(this.schedules[end-1]);
    this.ds.create_schedule().then((data:any) => {
        console.log('set_schedule_name : ', data);
        if (data) {
          let oid = data;
          this.loadScheduleData();
          // todo : scroll to schedule just created
          // this.schedules.unshift(data);
          // this.editSchedule(this.schedules[0]);

        }
    }).catch((error) => {
        console.log(error);
    });

    // this.selectedSchedule = this.schedules[end-1];
    //
    // setTimeout(() => {
    //   this.cdr.markForCheck();
    //   this.cdr.detectChanges();
    // }, 100);

  }


}
