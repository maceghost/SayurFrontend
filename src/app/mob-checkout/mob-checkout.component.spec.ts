import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobCheckoutComponent } from './mob-checkout.component';

describe('MobCheckoutComponent', () => {
  let component: MobCheckoutComponent;
  let fixture: ComponentFixture<MobCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
