import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthenticatedGuard } from './admin-authenticated.guard';

describe('AdminAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthenticatedGuard]
    });
  });

  it('should ...', inject([AdminAuthenticatedGuard], (guard: AdminAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
