import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobShopComponent } from './mob-shop.component';

describe('MobShopComponent', () => {
  let component: MobShopComponent;
  let fixture: ComponentFixture<MobShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
