import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerDetailComponent } from './controller-detail.component';

describe('ControllerDetailComponent', () => {
  let component: ControllerDetailComponent;
  let fixture: ComponentFixture<ControllerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
