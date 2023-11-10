import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureLoginComponent } from './secure-login.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

describe('SecureLoginComponent', () => {
  let component: SecureLoginComponent;
  let fixture: ComponentFixture<SecureLoginComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      data: {},
    },
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureLoginComponent, HeaderComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SecureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
