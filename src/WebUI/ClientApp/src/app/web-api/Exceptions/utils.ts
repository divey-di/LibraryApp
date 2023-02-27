import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { SwaggerException } from './swagger-exception';

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(() => result);
  else
      return _observableThrow(() => new SwaggerException(message, status, response, headers, null));
}
