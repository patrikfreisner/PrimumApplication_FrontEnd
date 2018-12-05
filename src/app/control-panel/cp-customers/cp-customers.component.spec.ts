import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpCustomersComponent } from './cp-customers.component';

describe('CpCustomersComponent', () => {
  let component: CpCustomersComponent;
  let fixture: ComponentFixture<CpCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
