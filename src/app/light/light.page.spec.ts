import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightPage } from './light.page';

describe('LightPage', () => {
  let component: LightPage;
  let fixture: ComponentFixture<LightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
