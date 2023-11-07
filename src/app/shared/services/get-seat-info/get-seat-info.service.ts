import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class GetSeatInfoService extends BaseRestApiService {
  categoryId: string;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getSeatCategories(eventID: string, showID: string): Observable<any> {
    return this.get('purchase/' + eventID + '/' + showID + '/categories');
  }

  submitSeatChoices(
    groupId: string,
    eventId: string,
    showId: string,
    userId: string,
    categoryId: string
  ) {
    this.categoryId = categoryId;
    return this.post('purchase/seat-category-selection', {
      groupId: groupId,
      eventId: eventId,
      showId: showId,
      userId: userId,
      categoryId: Number(categoryId),
    });
  }
}
