import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { FileResponse } from '../common';
import { blobToText } from '../utils';
import { throwException } from '../Exceptions/utils';

export interface IPaginatedListOfItemsBriefDto<ItemBriefDto> {
  items?: ItemBriefDto[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface IWebApiClient<
  CreateItemCommand,
  UpdateItemCommand,
  UpdateItemDetailsCommand,
  ItemBriefDto
> {
  getItemsWithPagination(
    Id: number | undefined,
    pageNumber: number | undefined,
    pageSize: number | undefined
  ): Observable<IPaginatedListOfItemsBriefDto<ItemBriefDto>>;
  create(command: CreateItemCommand): Observable<number>;
  update(id: number, command: UpdateItemCommand): Observable<FileResponse>;
  delete(id: number): Observable<FileResponse>;
  updateItemDetails(
    id: number | undefined,
    command: UpdateItemDetailsCommand
  ): Observable<FileResponse>;
}

export abstract class WebApiClient<
  CreateItemCommand,
  UpdateItemCommand,
  UpdateItemDetailsCommand,
  ItemBriefDto extends IItemDto
> implements
    IWebApiClient<
      CreateItemCommand,
      UpdateItemCommand,
      UpdateItemDetailsCommand,
      ItemBriefDto
    >
{
  private readonly _name: string;
  protected readonly http: HttpClient;
  protected readonly baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(name: string, http: HttpClient, baseUrl?: string) {
    this._name = name;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getItemsWithPagination(
    pageNumber: number,
    pageSize: number
  ): Observable<IPaginatedListOfItemsBriefDto<ItemBriefDto>> {
    let url_ = `${this.baseUrl}/api/${this._name}?`;
    if (pageNumber === null)
      throw new Error("The parameter 'pageNumber' cannot be null.");
    else if (pageNumber !== undefined)
      url_ += 'PageNumber=' + encodeURIComponent('' + pageNumber) + '&';
    if (pageSize === null)
      throw new Error("The parameter 'pageSize' cannot be null.");
    else if (pageSize !== undefined)
      url_ += 'PageSize=' + encodeURIComponent('' + pageSize) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetItemsWithPagination(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetItemsWithPagination(response_ as any);
            } catch (e) {
              return _observableThrow(() => e) as any as Observable<
                PaginatedListOfItemBriefDto<ItemBriefDto>
              >;
            }
          } else
            return _observableThrow(() => response_) as any as Observable<
              PaginatedListOfItemBriefDto<ItemBriefDto>
            >;
        })
      );
  }

  private processGetItemsWithPagination(
    response: HttpResponseBase
  ): Observable<PaginatedListOfItemBriefDto<ItemBriefDto>> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PaginatedListOfItemBriefDto.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  create(command: CreateItemCommand): Observable<number> {
    let url_ = `${this.baseUrl}/api/${this._name}`;
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCreate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreate(response_ as any);
            } catch (e) {
              return _observableThrow(() => e) as any as Observable<number>;
            }
          } else
            return _observableThrow(
              () => response_
            ) as any as Observable<number>;
        })
      );
  }

  private processCreate(response: HttpResponseBase): Observable<number> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  update(id: number, command: UpdateItemCommand): Observable<FileResponse> {
    let url_ = `${this.baseUrl}/api/${this._name}/{id}`;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/octet-stream',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(
                () => e
              ) as any as Observable<FileResponse>;
            }
          } else
            return _observableThrow(
              () => response_
            ) as any as Observable<FileResponse>;
        })
      );
  }

  private processUpdate(response: HttpResponseBase): Observable<FileResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get('content-disposition')
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return _observableOf({
        fileName: fileName,
        data: responseBlob as any,
        status: status,
        headers: _headers,
      });
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  delete(id: number): Observable<FileResponse> {
    let url_ = `${this.baseUrl}/api/${this._name}/{id}`;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/octet-stream',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDelete(response_ as any);
            } catch (e) {
              return _observableThrow(
                () => e
              ) as any as Observable<FileResponse>;
            }
          } else
            return _observableThrow(
              () => response_
            ) as any as Observable<FileResponse>;
        })
      );
  }

  private processDelete(response: HttpResponseBase): Observable<FileResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get('content-disposition')
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return _observableOf({
        fileName: fileName,
        data: responseBlob as any,
        status: status,
        headers: _headers,
      });
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  updateItemDetails(
    id: number | undefined,
    command: UpdateItemDetailsCommand
  ): Observable<FileResponse> {
    let url_ = `${this.baseUrl}/api/${this._name}/UpdateItemDetails?`;
    if (id === null) throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += 'id=' + encodeURIComponent('' + id) + '&';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/octet-stream',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateItemDetails(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateItemDetails(response_ as any);
            } catch (e) {
              return _observableThrow(
                () => e
              ) as any as Observable<FileResponse>;
            }
          } else
            return _observableThrow(
              () => response_
            ) as any as Observable<FileResponse>;
        })
      );
  }

  private processUpdateItemDetails(
    response: HttpResponseBase
  ): Observable<FileResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get('content-disposition')
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return _observableOf({
        fileName: fileName,
        data: responseBlob as any,
        status: status,
        headers: _headers,
      });
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

class PaginatedListOfItemBriefDto<T extends IItemDto>
  implements IPaginatedListOfItemBriefDto<T>
{
  items?: T[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  itemDto?: T;

  constructor(data?: IPaginatedListOfItemBriefDto<T>, itemDto?: new () => T) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this.itemDto = new itemDto();
  }

  init(itemFromJS: (data: any) => any, _data?: any) {
    if (_data) {
      if (Array.isArray(_data['items'])) {
        this.items = [] as any;
        for (let item of _data['items']) this.items!.push(itemFromJS(item));
      }
      this.pageNumber = _data['pageNumber'];
      this.totalPages = _data['totalPages'];
      this.totalCount = _data['totalCount'];
      this.hasPreviousPage = _data['hasPreviousPage'];
      this.hasNextPage = _data['hasNextPage'];
    }
  }

  static fromJS<T extends IItemDto>(data: any): PaginatedListOfItemBriefDto<T> {
    data = typeof data === 'object' ? data : {};
    let result = new PaginatedListOfItemBriefDto<T>();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data['items'] = [];
      for (let item of this.items) data['items'].push(item.toJSON());
    }
    data['pageNumber'] = this.pageNumber;
    data['totalPages'] = this.totalPages;
    data['totalCount'] = this.totalCount;
    data['hasPreviousPage'] = this.hasPreviousPage;
    data['hasNextPage'] = this.hasNextPage;
    return data;
  }
}

interface IPaginatedListOfItemBriefDto<T extends IItemDto> {
  items?: T[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface IItemDto {
  init: (_data?: any) => void;
  toJSON: () => any;
}
