import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1aPage } from './tab1a.page';

describe('Tab1aPage', () => {
  let component: Tab1aPage;
  let fixture: ComponentFixture<Tab1aPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1aPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1aPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
