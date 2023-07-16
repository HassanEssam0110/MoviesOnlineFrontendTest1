import { TestBed } from '@angular/core/testing';

import { UserRequsetMediaService } from './user-requset-media.service';

describe('UserRequsetMediaService', () => {
  let service: UserRequsetMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequsetMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
