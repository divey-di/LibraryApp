import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItemDto, WebApiClient } from './web-api-client-base';
import { TodoListDto } from './todo-lists-client';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class TodoItemsClient extends WebApiClient<CreateTodoItemCommand, UpdateTodoItemCommand, UpdateTodoItemDetailCommand, TodoItemBriefDto> {
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super("ToDoItems", http, baseUrl);
  }
}

export class PaginatedListOfTodoItemBriefDto implements IPaginatedListOfTodoItemBriefDto {
  items?: TodoItemBriefDto[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;

  constructor(data?: IPaginatedListOfTodoItemBriefDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(TodoItemBriefDto.fromJS(item));
          }
          this.pageNumber = _data["pageNumber"];
          this.totalPages = _data["totalPages"];
          this.totalCount = _data["totalCount"];
          this.hasPreviousPage = _data["hasPreviousPage"];
          this.hasNextPage = _data["hasNextPage"];
      }
  }

  static fromJS(data: any): PaginatedListOfTodoItemBriefDto {
      data = typeof data === 'object' ? data : {};
      let result = new PaginatedListOfTodoItemBriefDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      data["pageNumber"] = this.pageNumber;
      data["totalPages"] = this.totalPages;
      data["totalCount"] = this.totalCount;
      data["hasPreviousPage"] = this.hasPreviousPage;
      data["hasNextPage"] = this.hasNextPage;
      return data;
  }
}

export interface IPaginatedListOfTodoItemBriefDto {
  items?: TodoItemBriefDto[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export class TodoItemBriefDto implements ITodoItemBriefDto {
  id?: number;
  listId?: number;
  title?: string | undefined;
  done?: boolean;

  constructor(data?: ITodoItemBriefDto) {
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
          this.listId = _data["listId"];
          this.title = _data["title"];
          this.done = _data["done"];
      }
  }

  static fromJS(data: any): TodoItemBriefDto {
      data = typeof data === 'object' ? data : {};
      let result = new TodoItemBriefDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["listId"] = this.listId;
      data["title"] = this.title;
      data["done"] = this.done;
      return data;
  }
}

export interface ITodoItemBriefDto extends IItemDto {
  id?: number;
  listId?: number;
  title?: string | undefined;
  done?: boolean;
}

export class CreateTodoItemCommand implements ICreateTodoItemCommand {
  listId?: number;
  title?: string | undefined;

  constructor(data?: ICreateTodoItemCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.listId = _data["listId"];
          this.title = _data["title"];
      }
  }

  static fromJS(data: any): CreateTodoItemCommand {
      data = typeof data === 'object' ? data : {};
      let result = new CreateTodoItemCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["listId"] = this.listId;
      data["title"] = this.title;
      return data;
  }
}

export interface ICreateTodoItemCommand {
  listId?: number;
  title?: string | undefined;
}

export class UpdateTodoItemCommand implements IUpdateTodoItemCommand {
  id?: number;
  title?: string | undefined;
  done?: boolean;

  constructor(data?: IUpdateTodoItemCommand) {
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
          this.done = _data["done"];
      }
  }

  static fromJS(data: any): UpdateTodoItemCommand {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateTodoItemCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["title"] = this.title;
      data["done"] = this.done;
      return data;
  }
}

export interface IUpdateTodoItemCommand {
  id?: number;
  title?: string | undefined;
  done?: boolean;
}

export class UpdateTodoItemDetailCommand implements IUpdateTodoItemDetailCommand {
  id?: number;
  listId?: number;
  priority?: PriorityLevel;
  note?: string | undefined;

  constructor(data?: IUpdateTodoItemDetailCommand) {
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
          this.listId = _data["listId"];
          this.priority = _data["priority"];
          this.note = _data["note"];
      }
  }

  static fromJS(data: any): UpdateTodoItemDetailCommand {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateTodoItemDetailCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["listId"] = this.listId;
      data["priority"] = this.priority;
      data["note"] = this.note;
      return data;
  }
}

export interface IUpdateTodoItemDetailCommand {
  id?: number;
  listId?: number;
  priority?: PriorityLevel;
  note?: string | undefined;
}

export class TodoItemDto implements ITodoItemDto {
  id?: number;
  listId?: number;
  title?: string | undefined;
  done?: boolean;
  priority?: number;
  note?: string | undefined;

  constructor(data?: ITodoItemDto) {
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
          this.listId = _data["listId"];
          this.title = _data["title"];
          this.done = _data["done"];
          this.priority = _data["priority"];
          this.note = _data["note"];
      }
  }

  static fromJS(data: any): TodoItemDto {
      data = typeof data === 'object' ? data : {};
      let result = new TodoItemDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["listId"] = this.listId;
      data["title"] = this.title;
      data["done"] = this.done;
      data["priority"] = this.priority;
      data["note"] = this.note;
      return data;
  }
}

export interface ITodoItemDto extends IItemDto {
  id?: number;
  listId?: number;
  title?: string | undefined;
  done?: boolean;
  priority?: number;
  note?: string | undefined;
}

export class TodosVm implements ITodosVm {
  priorityLevels?: PriorityLevelDto[];
  lists?: TodoListDto[];

  constructor(data?: ITodosVm) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["priorityLevels"])) {
              this.priorityLevels = [] as any;
              for (let item of _data["priorityLevels"])
                  this.priorityLevels!.push(PriorityLevelDto.fromJS(item));
          }
          if (Array.isArray(_data["lists"])) {
              this.lists = [] as any;
              for (let item of _data["lists"])
                  this.lists!.push(TodoListDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): TodosVm {
      data = typeof data === 'object' ? data : {};
      let result = new TodosVm();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.priorityLevels)) {
          data["priorityLevels"] = [];
          for (let item of this.priorityLevels)
              data["priorityLevels"].push(item.toJSON());
      }
      if (Array.isArray(this.lists)) {
          data["lists"] = [];
          for (let item of this.lists)
              data["lists"].push(item.toJSON());
      }
      return data;
  }
}

export interface ITodosVm {
  priorityLevels?: PriorityLevelDto[];
  lists?: TodoListDto[];
}

export class PriorityLevelDto implements IPriorityLevelDto {
  value?: number;
  name?: string | undefined;

  constructor(data?: IPriorityLevelDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.value = _data["value"];
          this.name = _data["name"];
      }
  }

  static fromJS(data: any): PriorityLevelDto {
      data = typeof data === 'object' ? data : {};
      let result = new PriorityLevelDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["value"] = this.value;
      data["name"] = this.name;
      return data;
  }
}

export enum PriorityLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export interface IPriorityLevelDto {
  value?: number;
  name?: string | undefined;
}
