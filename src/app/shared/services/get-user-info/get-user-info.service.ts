import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService extends BaseRestApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  loadUserInfo(email: string): Observable<any> {
    return this.get('users/' + email);
  }
}
