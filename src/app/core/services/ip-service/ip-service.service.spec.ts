import { TestBed } from '@angular/core/testing';

import { IpServiceService } from './ip-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('IpServiceService', () => {
  let service: IpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(IpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
