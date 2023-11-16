import { TestBed } from "@angular/core/testing";
import { GetGroupInfoService } from "./get-group-info.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { GetUserInfoService } from "../get-user-info/get-user-info.service";




describe('GetGroupInfoService', () => {
  let service: GetGroupInfoService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });

    http = TestBed.inject(HttpClient);
    service = TestBed.inject(GetGroupInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set the groupId', () => {
    service.setGroupId = 'TEST-GROUP-3';
    expect(service.getGroupId).toEqual('TEST-GROUP-3');
  });

  it('should get and set the queueId', () =>{
    service.setQueueId = 'TEST-QUEUE-1';
    expect(service.getQueueId).toEqual('TEST-QUEUE-1');
  });

  it('should get the group size', () => {
    spyOn(http, 'get').and.stub();
    service.setGroupId = 'TEST-GROUP-1';
    service.getGroupSize();
    expect(http.get).toHaveBeenCalled();
  });

});
