import { TestBed } from '@angular/core/testing';

import { GetUserInfoService } from './get-user-info.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GetUserInfoService', () => {
  let service: GetUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(GetUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
