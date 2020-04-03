import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIconPage } from './map-icon.page';

describe('MapIconPage', () => {
  let component: MapIconPage;
  let fixture: ComponentFixture<MapIconPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIconPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
