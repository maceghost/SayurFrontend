import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobInfoComponent } from './mob-info.component';

describe('MobInfoComponent', () => {
  let component: MobInfoComponent;
  let fixture: ComponentFixture<MobInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
