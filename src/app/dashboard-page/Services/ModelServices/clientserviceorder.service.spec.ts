import { TestBed } from '@angular/core/testing';

import { ClientserviceorderService } from './clientserviceorder.service';

describe('ClientserviceorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientserviceorderService = TestBed.get(ClientserviceorderService);
    expect(service).toBeTruthy();
  });
});
