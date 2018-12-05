import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimumPageComponent } from './primum-page.component';

describe('PrimumPageComponent', () => {
  let component: PrimumPageComponent;
  let fixture: ComponentFixture<PrimumPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimumPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
