import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, queue } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetGroupInfoService extends BaseRestApiService {
  groupId: string;
  queueId: string;
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
    return this.get('purchase/group-size/' + this.groupId);
  }

  public get getQueueId(): string {
    return this.queueId;
  }

  public set setQueueId(queueId: string) {
    this.queueId = queueId;
  }

  public getQueueNumber(email: string, eventId: string, queueId: string): Observable<any> {
    return this.get('queues/queue-number/' + email + '/' + eventId + '/' + queueId);
    // return new Observable<any>();
  }

  public updateQueueNumber() {

  }
}
