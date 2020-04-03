import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionPage } from './provision.page';

describe('ProvisionPage', () => {
  let component: ProvisionPage;
  let fixture: ComponentFixture<ProvisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
