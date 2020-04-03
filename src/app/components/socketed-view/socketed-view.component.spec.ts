import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketedViewComponent } from './socketed-view.component';

describe('SocketedViewComponent', () => {
  let component: SocketedViewComponent;
  let fixture: ComponentFixture<SocketedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketedViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
