import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobHomeComponent } from './mob-home.component';

describe('MobHomeComponent', () => {
  let component: MobHomeComponent;
  let fixture: ComponentFixture<MobHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
