import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

export function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader();
          reader.onload = event => {
              observer.next((event.target as any).result);
              observer.complete();
          };
          reader.readAsText(blob);
      }
  });
}
