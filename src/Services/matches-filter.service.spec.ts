import { TestBed } from '@angular/core/testing';

import { MatchesFilterService } from './matches-filter.service';

describe('MatchesFilterService', () => {
  let service: MatchesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
