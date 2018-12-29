import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpLoadingComponent } from './dp-loading.component';

describe('DpLoadingComponent', () => {
  let component: DpLoadingComponent;
  let fixture: ComponentFixture<DpLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
