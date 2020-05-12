import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskOrderComponent } from './desk-order.component';

describe('DeskOrderComponent', () => {
  let component: DeskOrderComponent;
  let fixture: ComponentFixture<DeskOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
