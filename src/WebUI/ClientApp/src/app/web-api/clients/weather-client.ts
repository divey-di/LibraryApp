import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { blobToText } from '../utils';
import { throwException } from '../Exceptions/utils';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IWeatherForecastClient {
  get(): Observable<WeatherForecast[]>;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastClient implements IWeatherForecastClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  get(): Observable<WeatherForecast[]> {
      let url_ = this.baseUrl + "/api/WeatherForecast";
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGet(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGet(response_ as any);
              } catch (e) {
                  return _observableThrow(() => e) as any as Observable<WeatherForecast[]>;
              }
          } else
              return _observableThrow(() => response_) as any as Observable<WeatherForecast[]>;
      }));
  }

  protected processGet(response: HttpResponseBase): Observable<WeatherForecast[]> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          if (Array.isArray(resultData200)) {
              result200 = [] as any;
              for (let item of resultData200)
                  result200!.push(WeatherForecast.fromJS(item));
          }
          else {
              result200 = <any>null;
          }
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }
}


export class WeatherForecast implements IWeatherForecast {
  date?: Date;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | undefined;

  constructor(data?: IWeatherForecast) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
          this.temperatureC = _data["temperatureC"];
          this.temperatureF = _data["temperatureF"];
          this.summary = _data["summary"];
      }
  }

  static fromJS(data: any): WeatherForecast {
      data = typeof data === 'object' ? data : {};
      let result = new WeatherForecast();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["date"] = this.date ? this.date.toISOString() : <any>undefined;
      data["temperatureC"] = this.temperatureC;
      data["temperatureF"] = this.temperatureF;
      data["summary"] = this.summary;
      return data;
  }
}

export interface IWeatherForecast {
  date?: Date;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | undefined;
}
