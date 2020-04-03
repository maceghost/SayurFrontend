import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayPage } from './gateway.page';

describe('GatewayPage', () => {
  let component: GatewayPage;
  let fixture: ComponentFixture<GatewayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
