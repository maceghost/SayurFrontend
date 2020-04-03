import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1bPage } from './tab1b.page';

describe('Tab1bPage', () => {
  let component: Tab1bPage;
  let fixture: ComponentFixture<Tab1bPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1bPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1bPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
