import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignComponent } from './assign.component';

describe('AssignComponent', () => {
  let component: AssignComponent;
  let fixture: ComponentFixture<AssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
