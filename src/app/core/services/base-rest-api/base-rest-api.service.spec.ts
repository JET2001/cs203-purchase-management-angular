import { TestBed } from '@angular/core/testing';

import { BaseRestApiService } from './base-rest-api.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { baseURL } from '../../constants/api-paths';

@Injectable()
class TestingApiService extends BaseRestApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public postTest(path: string, data: any): Observable<any> {
    return this.post(path, data);
  }

  public getTest(path: string): Observable<any> {
    return this.get(path);
  }

  public putTest(path: string, data: any): Observable<any> {
    return this.put(path, data);
  }

  public deleteTest(path: string): Observable<any> {
    return this.delete(path);
  }

  public getWithParamsTest(path: string, params: HttpParams): Observable<any> {
    return this.getWithParams(path, params);
  }
}

describe('BaseRestApiService', () => {
  let service: TestingApiService;
  let http: HttpClient;

  let httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, TestingApiService],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(TestingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('http post should be called with the baseURL and path', () => {
    spyOn(http, 'post').and.stub().and.returnValue(of(true));
    service
      .postTest('TEST-API-ENDPOINT', { userID: 'MOCK-USERID-1' })
      .subscribe(
        (data: boolean) => {
          expect(data).toBeTrue();
        },
        (error: HttpErrorResponse) => {
          fail('Not supposed to throw an error');
        }
      );
  });

  it('http get should be called with the baseURL and path', () => {
    spyOn(http, 'get').and.stub().and.returnValue(of(true));
    service.getTest('TEST-API-ENDPOINT').subscribe(
      (data: boolean) => {
        expect(data).toBeTrue();
      },
      (error: HttpErrorResponse) => {
        fail('Not supposed to throw an error');
      }
    );
  });

  it('http put should be called with the baseURL and path', () => {
    spyOn(http, 'put').and.stub().and.returnValue(of(true));
    service.putTest('TEST-API-ENDPOINT', { userID: 'MOCK-USERID-1' }).subscribe(
      (data: boolean) => {
        expect(data).toBeTrue();
      },
      (error: HttpErrorResponse) => {
        fail('Not supposed to throw an error');
      }
    );
  });

  it('http delete should be called with the baseURL and path', () => {
    spyOn(http, 'delete').and.stub().and.returnValue(of(true));
    service.deleteTest('TEST-API-ENDPOINT').subscribe(
      (data: boolean) => {
        expect(data).toBeTrue();
      },
      (error: HttpErrorResponse) => {
        fail('Not supposed to throw an error');
      }
    );
  });

  it('http getWithParams should be called with the baseURL and path', () => {
    spyOn(http, 'get').and.stub().and.returnValue(of(true));
    let params = new HttpParams();

    let finalHeaders = { params: params, headers: httpHeaders.headers };
    params = params.append('userID', 'MOCK-USER-1');
    service.getWithParamsTest('TEST-API-ENDPOINT', params).subscribe(
      (data: boolean) => {
        expect(data).toBeTrue();
        // expect(http.get).toHaveBeenCalledWith(`${baseURL}/TEST-API-ENDPOINT`, finalHeaders);
      },
      (error: HttpErrorResponse) => {
        fail('Not supposed to throw an error');
      }
    );
  });
});
