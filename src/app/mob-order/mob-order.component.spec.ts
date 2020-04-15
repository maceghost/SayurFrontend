import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobOrderComponent } from './mob-order.component';

describe('MobOrderComponent', () => {
  let component: MobOrderComponent;
  let fixture: ComponentFixture<MobOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
