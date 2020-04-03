import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightmodalComponent } from './lightmodal.component';

describe('LightmodalComponent', () => {
  let component: LightmodalComponent;
  let fixture: ComponentFixture<LightmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightmodalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
