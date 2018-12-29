import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpClientIntegrationComponent } from './cp-client-integration.component';

describe('CpClientIntegrationComponent', () => {
  let component: CpClientIntegrationComponent;
  let fixture: ComponentFixture<CpClientIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpClientIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpClientIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
