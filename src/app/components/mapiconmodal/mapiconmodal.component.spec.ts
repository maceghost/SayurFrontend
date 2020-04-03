import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapiconmodalComponent } from './mapiconmodal.component';

describe('MapiconmodalComponent', () => {
  let component: MapiconmodalComponent;
  let fixture: ComponentFixture<MapiconmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapiconmodalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapiconmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
