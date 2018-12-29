import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForRegisterComponent } from './waiting-for-register.component';

describe('WaitingForRegisterComponent', () => {
  let component: WaitingForRegisterComponent;
  let fixture: ComponentFixture<WaitingForRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingForRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
