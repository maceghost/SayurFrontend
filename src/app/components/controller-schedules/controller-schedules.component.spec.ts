import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSchedulesComponent } from './controller-schedules.component';
import { AssignScheduleComponent } from '../assign-schedule/assign-schedule.component';

describe('ControllerSchedulesComponent', () => {
  let component: ControllerSchedulesComponent;
  let fixture: ComponentFixture<ControllerSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerSchedulesComponent, AssignScheduleComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
