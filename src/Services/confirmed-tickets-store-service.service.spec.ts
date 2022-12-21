import { TestBed } from '@angular/core/testing';

import { ConfirmedTicketsStoreService } from './confirmed-tickets-store-service.service';

describe('ConfirmationServiceService', () => {
  let service: ConfirmedTicketsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmedTicketsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
