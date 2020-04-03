import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadFormComponent } from './keypad-form.component';

describe('KeypadFormComponent', () => {
  let component: KeypadFormComponent;
  let fixture: ComponentFixture<KeypadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
