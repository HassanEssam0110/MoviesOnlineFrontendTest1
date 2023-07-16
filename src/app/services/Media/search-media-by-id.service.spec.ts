import { TestBed } from '@angular/core/testing';

import { SearchMediaByIdService } from './search-media-by-id.service';

describe('SearchMediaByIdService', () => {
  let service: SearchMediaByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMediaByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
