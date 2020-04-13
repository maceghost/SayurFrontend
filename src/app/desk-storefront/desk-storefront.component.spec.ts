import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskStorefrontComponent } from './desk-storefront.component';

describe('DeskStorefrontComponent', () => {
  let component: DeskStorefrontComponent;
  let fixture: ComponentFixture<DeskStorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskStorefrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskStorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
