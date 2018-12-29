import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpUserManagementComponent } from './cp-user-management.component';

describe('CpUserManagementComponent', () => {
  let component: CpUserManagementComponent;
  let fixture: ComponentFixture<CpUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
