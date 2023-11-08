import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetGroupInfoService extends BaseRestApiService {
  groupId: string;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public get getGroupId(): string {
    return this.groupId;
  }

  public set setGroupId(groupId: string) {
    this.groupId = groupId;
  }

  public getGroupSize() {
    console.log(this.groupId)
    return this.get('purchase/group-size/' + this.groupId);
  }
}
