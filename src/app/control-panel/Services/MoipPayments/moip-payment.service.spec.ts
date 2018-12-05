import { TestBed } from '@angular/core/testing';

import { MoipPaymentService } from './moip-payment.service';

describe('MoipPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoipPaymentService = TestBed.get(MoipPaymentService);
    expect(service).toBeTruthy();
  });
});
