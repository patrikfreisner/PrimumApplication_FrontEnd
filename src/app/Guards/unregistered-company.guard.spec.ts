import { TestBed, async, inject } from '@angular/core/testing';

import { UnregisteredCompanyGuard } from './unregistered-company.guard';

describe('UnregisteredCompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnregisteredCompanyGuard]
    });
  });

  it('should ...', inject([UnregisteredCompanyGuard], (guard: UnregisteredCompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
