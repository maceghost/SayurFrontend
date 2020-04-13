import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobStorefrontComponent } from './mob-storefront.component';

describe('MobStorefrontComponent', () => {
  let component: MobStorefrontComponent;
  let fixture: ComponentFixture<MobStorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobStorefrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobStorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
