import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { FileResponse } from '../common';
import { blobToText } from '../utils';
import { throwException } from '../Exceptions/utils';
import { TodoItemDto, TodosVm } from "./todo-items-client";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface ITodoListsClient {
  get(): Observable<TodosVm>;
  create(command: CreateTodoListCommand): Observable<number>;
  get2(id: number): Observable<FileResponse>;
  update(id: number, command: UpdateTodoListCommand): Observable<FileResponse>;
  delete(id: number): Observable<FileResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListsClient implements ITodoListsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  get(): Observable<TodosVm> {
      let url_ = this.baseUrl + "/api/TodoLists";
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
                  return _observableThrow(e) as any as Observable<TodosVm>;
              }
          } else
              return _observableThrow(response_) as any as Observable<TodosVm>;
      }));
  }

  protected processGet(response: HttpResponseBase): Observable<TodosVm> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = TodosVm.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }

  create(command: CreateTodoListCommand): Observable<number> {
      let url_ = this.baseUrl + "/api/TodoLists";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(command);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json",
              "Accept": "application/json"
          })
      };

      return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processCreate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processCreate(response_ as any);
              } catch (e) {
                  return _observableThrow(e) as any as Observable<number>;
              }
          } else
              return _observableThrow(response_) as any as Observable<number>;
      }));
  }

  protected processCreate(response: HttpResponseBase): Observable<number> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
              result200 = resultData200 !== undefined ? resultData200 : <any>null;

          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }

  get2(id: number): Observable<FileResponse> {
      let url_ = this.baseUrl + "/api/TodoLists/{id}";
      if (id === undefined || id === null)
          throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/octet-stream"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGet2(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGet2(response_ as any);
              } catch (e) {
                  return _observableThrow(e) as any as Observable<FileResponse>;
              }
          } else
              return _observableThrow(response_) as any as Observable<FileResponse>;
      }));
  }

  protected processGet2(response: HttpResponseBase): Observable<FileResponse> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200 || status === 206) {
          const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
          let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
          let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
          if (fileName) {
              fileName = decodeURIComponent(fileName);
          } else {
              fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
              fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
          }
          return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }

  update(id: number, command: UpdateTodoListCommand): Observable<FileResponse> {
      let url_ = this.baseUrl + "/api/TodoLists/{id}";
      if (id === undefined || id === null)
          throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(command);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json",
              "Accept": "application/octet-stream"
          })
      };

      return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processUpdate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processUpdate(response_ as any);
              } catch (e) {
                  return _observableThrow(e) as any as Observable<FileResponse>;
              }
          } else
              return _observableThrow(response_) as any as Observable<FileResponse>;
      }));
  }

  protected processUpdate(response: HttpResponseBase): Observable<FileResponse> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200 || status === 206) {
          const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
          let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
          let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
          if (fileName) {
              fileName = decodeURIComponent(fileName);
          } else {
              fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
              fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
          }
          return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }

  delete(id: number): Observable<FileResponse> {
      let url_ = this.baseUrl + "/api/TodoLists/{id}";
      if (id === undefined || id === null)
          throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/octet-stream"
          })
      };

      return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processDelete(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processDelete(response_ as any);
              } catch (e) {
                  return _observableThrow(e) as any as Observable<FileResponse>;
              }
          } else
              return _observableThrow(response_) as any as Observable<FileResponse>;
      }));
  }

  protected processDelete(response: HttpResponseBase): Observable<FileResponse> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200 || status === 206) {
          const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
          let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
          let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
          if (fileName) {
              fileName = decodeURIComponent(fileName);
          } else {
              fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
              fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
          }
          return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf(null as any);
  }
}

export class TodoListDto implements ITodoListDto {
  id?: number;
  title?: string | undefined;
  colour?: string | undefined;
  items?: TodoItemDto[];

  constructor(data?: ITodoListDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.title = _data["title"];
          this.colour = _data["colour"];
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(TodoItemDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): TodoListDto {
      data = typeof data === 'object' ? data : {};
      let result = new TodoListDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["title"] = this.title;
      data["colour"] = this.colour;
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }
}

export interface ITodoListDto {
  id?: number;
  title?: string | undefined;
  colour?: string | undefined;
  items?: TodoItemDto[];
}

export class CreateTodoListCommand implements ICreateTodoListCommand {
  title?: string | undefined;

  constructor(data?: ICreateTodoListCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.title = _data["title"];
      }
  }

  static fromJS(data: any): CreateTodoListCommand {
      data = typeof data === 'object' ? data : {};
      let result = new CreateTodoListCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["title"] = this.title;
      return data;
  }
}

export interface ICreateTodoListCommand {
  title?: string | undefined;
}

export class UpdateTodoListCommand implements IUpdateTodoListCommand {
  id?: number;
  title?: string | undefined;

  constructor(data?: IUpdateTodoListCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.title = _data["title"];
      }
  }

  static fromJS(data: any): UpdateTodoListCommand {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateTodoListCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["title"] = this.title;
      return data;
  }
}

export interface IUpdateTodoListCommand {
  id?: number;
  title?: string | undefined;
}
