import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerGridComponent } from './controller-grid.component';

describe('ControllerGridComponent', () => {
  let component: ControllerGridComponent;
  let fixture: ComponentFixture<ControllerGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
