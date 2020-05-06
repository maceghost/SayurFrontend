import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskPortalComponent } from './desk-portal.component';

describe('DeskPortalComponent', () => {
  let component: DeskPortalComponent;
  let fixture: ComponentFixture<DeskPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
