import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePanelPage } from './device-panel.page';

describe('DevicePanelPage', () => {
  let component: DevicePanelPage;
  let fixture: ComponentFixture<DevicePanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePanelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
