import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  IItemDto,
  WebApiClient,
} from './web-api-client-base';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class BooksClient extends WebApiClient<
  CreateBookCommand,
  UpdateBookCommand,
  UpdateBookDetailCommand,
  BookBriefDto
> {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super('Books', http, baseUrl);
  }
}

class BookBriefDto implements IBookBriefDto {
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;

  constructor(data?: IBookBriefDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.isbn = _data['isbn'];
      this.title = _data['title'];
      this.author = _data['author'];
    }
  }

  static fromJS(data: any): BookBriefDto {
    data = typeof data === 'object' ? data : {};
    let result = new BookBriefDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['isbn'] = this.isbn;
    data['title'] = this.title;
    data['author'] = this.author;
    return data;
  }
}

interface IBookBriefDto extends IItemDto {
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;
}

class CreateBookCommand implements ICreateBookCommand {
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;

  constructor(data?: ICreateBookCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.isbn = _data['isbn'];
      this.title = _data['title'];
      this.author = _data['author'];
    }
  }

  static fromJS(data: any): CreateBookCommand {
    data = typeof data === 'object' ? data : {};
    let result = new CreateBookCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['isbn'] = this.isbn;
    data['title'] = this.title;
    data['author'] = this.author;
    return data;
  }
}

interface ICreateBookCommand {
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;
}

class UpdateBookCommand implements IUpdateBookCommand {
  id?: number;
  title?: string | undefined;
  done?: boolean;

  constructor(data?: IUpdateBookCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.title = _data['title'];
      this.done = _data['done'];
    }
  }

  static fromJS(data: any): UpdateBookCommand {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateBookCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['title'] = this.title;
    data['done'] = this.done;
    return data;
  }
}

interface IUpdateBookCommand {
  id?: number;
  title?: string | undefined;
  done?: boolean;
}

class UpdateBookDetailCommand implements IUpdateBookDetailCommand {
  id?: number;
  Id?: number;
  note?: string | undefined;

  constructor(data?: IUpdateBookDetailCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.Id = _data['Id'];
      this.note = _data['note'];
    }
  }

  static fromJS(data: any): UpdateBookDetailCommand {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateBookDetailCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['Id'] = this.Id;
    data['note'] = this.note;
    return data;
  }
}

interface IUpdateBookDetailCommand {
  id?: number;
  Id?: number;
  note?: string | undefined;
}

interface IBookDto extends IItemDto{
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;
  publisher?: string | undefined;
  publishDate?: Date;
  genre?: string;
  synopsis?: string | undefined;
  coverArtUri?: string | undefined;
  pageCount?: number;
}

class BookDto implements IBookDto {
  id?: number;
  isbn?: number;
  title?: string | undefined;
  author?: string | undefined;
  publisher?: string | undefined;
  publishDate?: Date;
  genre?: string;
  synopsis?: string | undefined;
  coverArtUri?: string | undefined;
  pageCount?: number;

  constructor(data?: IBookDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.isbn = _data['isbn'];
      this.title = _data['title'];
      this.author = _data['author'];
      this.publisher = _data['publisher'];
      this.publishDate = _data['publishDate'];
      this.genre = _data['genre'];
      this.synopsis = _data['synopsis'];
      this.coverArtUri = _data['coverArtUri'];
      this.pageCount = _data['pageCount'];
    }
  }

  static fromJS(data: any): BookDto {
    data = typeof data === 'object' ? data : {};
    let result = new BookDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['isbn'] = this.isbn;
    data['title'] = this.title;
    data['author'] = this.author;
    data['publisher'] = this.publisher;
    data['publishDate'] = this.publishDate;
    data['genre'] = this.genre;
    data['synopsis'] = this.synopsis;
    data['coverArtUri'] = this.coverArtUri;
    data['pageCount'] = this.pageCount;
    return data;
  }
}
