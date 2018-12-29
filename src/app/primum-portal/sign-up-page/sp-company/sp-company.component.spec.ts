import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCompanyComponent } from './sp-company.component';

describe('SpCompanyComponent', () => {
  let component: SpCompanyComponent;
  let fixture: ComponentFixture<SpCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
