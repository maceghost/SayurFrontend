import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskShopComponent } from './desk-shop.component';

describe('DeskShopComponent', () => {
  let component: DeskShopComponent;
  let fixture: ComponentFixture<DeskShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
