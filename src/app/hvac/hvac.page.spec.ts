import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSchedulesComponent } from '../components/controller-schedules/controller-schedules.component';
import { AssignScheduleComponent } from '../components/assign-schedule/assign-schedule.component';

import { HvacPage } from './hvac.page';

describe('HvacPage', () => {
  let component: HvacPage;
  let fixture: ComponentFixture<HvacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvacPage, ControllerSchedulesComponent, AssignScheduleComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
