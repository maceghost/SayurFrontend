import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSetupComponent } from './controller-setup.component';

describe('ControllerSetupComponent', () => {
  let component: ControllerSetupComponent;
  let fixture: ComponentFixture<ControllerSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
