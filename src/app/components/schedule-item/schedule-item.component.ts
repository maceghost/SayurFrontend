import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {

  dayName:string;
  editing = false;
  initialized = false;
  touched = false;

  @Input('parent') parent:any;
  @Input('day-index') idx:any;
  @Input('day-time') data:any;

  @ViewChild('container') container:ElementRef;
  @ViewChild('time') time:ElementRef;

  DAY_NAMES = [ 'SUN','MON','TUE','WED','THU','FRI','SAT' ];

  constructor(private cdr: ChangeDetectorRef,  public elementRef: ElementRef) {
    console.log('constructor ...');
  }

  ngOnInit() {
    console.log('ngOnInit ...');
    this.dayName = this.DAY_NAMES[this.idx];
    this.time = this.data;
    this.initialized = true;
  }

  getDayName() {
    return this.DAY_NAMES[this.idx];
  }

  refresh() {
    setTimeout(() => {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }, 100);

  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  editDayTime(event) {
    this.parent.editInputField(event, this.idx);
  }

  updateData(d) {
    console.log('updateData : ',this.idx);
    this.data = d;
    this.touched = true;
  }

  getData() {
    return this.data;
  }
  
  setTouched(t) {
    console.log('setTouched : ',this.idx);
    this.touched = t;
  }

}
