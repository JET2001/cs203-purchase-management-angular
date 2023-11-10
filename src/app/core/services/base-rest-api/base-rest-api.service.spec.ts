import { TestBed } from '@angular/core/testing';

import { BaseRestApiService } from './base-rest-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BaseRestApiService', () => {
  let service: BaseRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(BaseRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
