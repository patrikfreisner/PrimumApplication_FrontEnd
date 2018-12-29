import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUserComponent } from './sp-user.component';

describe('SpUserComponent', () => {
  let component: SpUserComponent;
  let fixture: ComponentFixture<SpUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
