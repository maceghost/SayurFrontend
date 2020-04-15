import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskCartComponent } from './desk-cart.component';

describe('DeskCartComponent', () => {
  let component: DeskCartComponent;
  let fixture: ComponentFixture<DeskCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
