import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSocketViewComponent } from './controller-socket-view.component';

describe('ControllerSocketViewComponent', () => {
  let component: ControllerSocketViewComponent;
  let fixture: ComponentFixture<ControllerSocketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerSocketViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSocketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
