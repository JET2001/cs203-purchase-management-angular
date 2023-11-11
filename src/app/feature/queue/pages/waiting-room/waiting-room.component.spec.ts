import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRoomComponent } from './waiting-room.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('WaitingRoomComponent', () => {
  let component: WaitingRoomComponent;
  let fixture: ComponentFixture<WaitingRoomComponent>;
  let getGroupInfoService: GetGroupInfoService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingRoomComponent, ProgressBar],
      providers: [HttpClient, HttpHandler]
    });

    getGroupInfoService = TestBed.inject(GetGroupInfoService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(WaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at queue number 1000, it should say you are "notFirst"', () => {
    // Add spies
    spyOn(getGroupInfoService, 'getQueueNumber').and.returnValue(of({
      queueNumber: 1000
    }));
    component.ngOnInit();
    expect(component.isFirst()).toBeFalse();
    expect(component.queueNumber).toEqual(1000);
  });

  it ('at queue number 1 it should say that you are first', () => {
    // Add spies
    spyOn(getGroupInfoService, 'getQueueNumber').and.returnValue(of({
      queueNumber: 1
    }));
    component.ngOnInit();
    expect(component.isFirst()).toBeTrue();
    expect(component.queueNumber).toEqual(1);
  });

  it('should route to the purchase/categories page upon clicking next', () => {
    spyOn(router, 'navigate').and.stub();
    component.handleNext();
    expect(router.navigate).toHaveBeenCalledWith(['purchase','categories']);
  });

});
