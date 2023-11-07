import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService extends BaseRestApiService {
  private eventId: string;
  private showId: string;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public get getEventId() {
    return this.eventId;
  }

  public set setEventId(eventId: string) {
    this.eventId = eventId;
  }

  public get getShowId() {
    return this.showId;
  }

  public set setShowId(showId: string) {
    this.showId = showId;
  }

  getEventTitle() {
    return this.post('purchase/event', { eventId: this.eventId });
  }
}
