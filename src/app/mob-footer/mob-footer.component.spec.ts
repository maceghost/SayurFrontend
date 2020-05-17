import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobFooterComponent } from './mob-footer.component';

describe('MobFooterComponent', () => {
  let component: MobFooterComponent;
  let fixture: ComponentFixture<MobFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
