import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIconDetailComponent } from './map-icon-detail.component';

describe('MapIconDetailComponent', () => {
  let component: MapIconDetailComponent;
  let fixture: ComponentFixture<MapIconDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIconDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIconDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
