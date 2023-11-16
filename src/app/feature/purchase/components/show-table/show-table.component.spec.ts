import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTableComponent } from './show-table.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ShowTableComponent', () => {
  let component: ShowTableComponent;
  let fixture: ComponentFixture<ShowTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTableComponent],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(ShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
