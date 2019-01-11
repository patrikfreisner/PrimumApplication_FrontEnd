import { TestBed, async, inject } from '@angular/core/testing';

import { RegisteredWithoutMoipIDGuard } from './registered-without-moip-id.guard';

describe('RegisteredWithoutMoipIDGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisteredWithoutMoipIDGuard]
    });
  });

  it('should ...', inject([RegisteredWithoutMoipIDGuard], (guard: RegisteredWithoutMoipIDGuard) => {
    expect(guard).toBeTruthy();
  }));
});
