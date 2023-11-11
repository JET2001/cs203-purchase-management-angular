import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { baseURL } from '../../constants/api-paths';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRestApiService {

  // Field inject HttpClient to prevent dependency conflicts
  constructor(protected http: HttpClient) {};

  protected httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // constructor() {}

  // Post request
  protected post(path: string, data: any): Observable<any> {
    return this.http.post(`${baseURL}/${path}`, data, this.httpHeaders);
  }

  // Get Request
  protected get(path: string): Observable<any> {
    return this.http.get(`${baseURL}/${path}`, this.httpHeaders);
  }

  // Put Request
  protected put(path: string, data: any): Observable<any> {
    return this.http.put(`${baseURL}/${path}`, data, this.httpHeaders);
  }

  // Delete Request
  protected delete(path: string): Observable<any> {
    return this.http.delete(`${baseURL}/${path}`, this.httpHeaders);
  }

  // Get Request with Parameters.
  protected getWithParams(path: string, params: HttpParams): Observable<any>{
    // let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    // console.log(headers);
    const options = {params: params, headers: this.httpHeaders.headers};

    return this.http.get(`${baseURL}/${path}`, options);
  }

  // Error handling --> this method can be overwritten if more fine grained error handling is required.
  // The default implementation creates a string in an error object
  // protected handleError(error: HttpErrorResponse): Error {
  //   return error;
  //   // return new Error(error.status.toString());
  // }
}
