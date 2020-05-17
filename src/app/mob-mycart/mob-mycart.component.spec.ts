import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobMycartComponent } from './mob-mycart.component';

describe('MobMycartComponent', () => {
  let component: MobMycartComponent;
  let fixture: ComponentFixture<MobMycartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobMycartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobMycartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
