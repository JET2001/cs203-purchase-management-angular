import { TestBed } from "@angular/core/testing";
import { GetSeatInfoService } from "./get-seat-info.service";
import { HttpClient, HttpHandler } from "@angular/common/http";




describe('GetSeatInfoService', () => {
  let service: GetSeatInfoService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(GetSeatInfoService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a post request to submit seat choices', () => {
    spyOn(http, 'post').and.stub();
    service.submitSeatChoices('MOCK-GROUP-1','MOCK-EVENT-1', 'MOCK-SHOW-1', 'MOCK-USER-1', 'MOCK-CATEGORY-1');

    expect(service.categoryId).toEqual('MOCK-CATEGORY-1');
    expect(http.post).toHaveBeenCalled();
  })
});
