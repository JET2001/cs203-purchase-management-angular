import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRoomComponent } from './waiting-room.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';

describe('WaitingRoomComponent', () => {
  let component: WaitingRoomComponent;
  let fixture: ComponentFixture<WaitingRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingRoomComponent, ProgressBar],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(WaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
