import { TestBed } from '@angular/core/testing';

import { ClientcustService } from './clientcust.service';

describe('ClientcustService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientcustService = TestBed.get(ClientcustService);
    expect(service).toBeTruthy();
  });
});
