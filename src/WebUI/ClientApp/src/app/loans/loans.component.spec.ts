import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoansComponent } from './loans.component';
import { Observable, of } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InjectionToken } from '@angular/core';
import { FileResponse, LoansClient } from '../web-api-client';

export const WINDOW = new InjectionToken('Window');
export const LOANSCLIENT = new InjectionToken('LoansClient');

describe('LoansComponent', () => {
  let component: LoansComponent;
  let fixture: ComponentFixture<LoansComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule ],
      declarations: [ LoansComponent ],
      providers: [
      BsModalService, HttpClient
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let authService = TestBed.get(AuthorizeService);

    spyOn(authService, 'ensureUserManagerInitialized').and.returnValue(
      Promise.resolve());
    spyOn(authService, 'getUserFromStorage').and.returnValue(
      of(null));

    fixture = TestBed.createComponent(LoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
