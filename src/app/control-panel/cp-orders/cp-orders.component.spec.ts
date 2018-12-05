import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpOrdersComponent } from './cp-orders.component';

describe('CpOrdersComponent', () => {
  let component: CpOrdersComponent;
  let fixture: ComponentFixture<CpOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
