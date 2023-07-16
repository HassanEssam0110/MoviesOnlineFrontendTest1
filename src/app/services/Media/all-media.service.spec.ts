import { TestBed } from '@angular/core/testing';

import { AllMediaService } from './all-media.service';

describe('AllMediaService', () => {
  let service: AllMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
