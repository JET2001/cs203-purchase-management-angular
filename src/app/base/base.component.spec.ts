import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './base.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let spinner: NgxSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComponent],
      providers: [NgxSpinnerService],
    });
    fixture = TestBed.createComponent(BaseComponent);
    spinner = TestBed.inject(NgxSpinnerService);
    spyOn(spinner, 'hide').and.stub();
    spyOn(spinner, 'show').and.callThrough();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop the spinner after 1 second from calling', fakeAsync(() => {
    component.spinnerHide();
    expect(spinner.hide).toHaveBeenCalledTimes(0);
    tick(1000);
    expect(spinner.hide).toHaveBeenCalled();
  }));

  it('should not start the spinner twice', () => {
    component.spinnerShow();
    expect(spinner.show).toHaveBeenCalledTimes(1);
    component.spinnerShow();
    expect(spinner.show).toHaveBeenCalledTimes(1); // not called again
  });
});
