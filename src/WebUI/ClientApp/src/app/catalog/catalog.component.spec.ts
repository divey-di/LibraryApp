import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CatalogComponent } from './catalog.component';
import { of } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule ],
      declarations: [ CatalogComponent ],
      providers: [BsModalService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let authService = TestBed.get(AuthorizeService);

    spyOn(authService, 'ensureUserManagerInitialized').and.returnValue(
      Promise.resolve());
    spyOn(authService, 'getUserFromStorage').and.returnValue(
      of(null));

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
