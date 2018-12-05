import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpPaymentsComponent } from './cp-payments.component';

describe('CpPaymentsComponent', () => {
  let component: CpPaymentsComponent;
  let fixture: ComponentFixture<CpPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
