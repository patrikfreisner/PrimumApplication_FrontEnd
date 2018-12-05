import { TestBed } from '@angular/core/testing';

import { MoipOrderService } from './moip-order.service';

describe('MoipOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoipOrderService = TestBed.get(MoipOrderService);
    expect(service).toBeTruthy();
  });
});
