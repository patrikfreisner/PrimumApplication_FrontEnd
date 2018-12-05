import { TestBed } from '@angular/core/testing';

import { MoipCustomerService } from './moip-customer.service';

describe('MoipCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoipCustomerService = TestBed.get(MoipCustomerService);
    expect(service).toBeTruthy();
  });
});
