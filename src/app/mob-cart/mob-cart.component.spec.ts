import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobCartComponent } from './mob-cart.component';

describe('MobCartComponent', () => {
  let component: MobCartComponent;
  let fixture: ComponentFixture<MobCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
