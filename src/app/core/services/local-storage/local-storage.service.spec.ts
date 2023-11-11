import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do nothing if userToken is null', () =>{
    spyOn(localStorage,'setItem').and.stub();
    service.userToken = null;
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
});
