import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppHttpResource {
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: any, headers?: any): Observable<T>;

  get(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('get', path, params, headers);
  }

  post(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('post', path, params, headers);
  }

  put<T>(path: string, params: {}, headers?: {}): Observable<T>;

  put(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('put', path, params, headers);
  }

  delete(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('delete', path, params, headers);
  }

  request(method: string, path: string, params = {}, headers = {}): Observable<any> {
    return of(localStorage.getItem(environment.access_token)).pipe(
      switchMap(token => {
        const httpHeaders = new HttpHeaders({
          ...headers,
          Authorization: `Bearer ${token}`,
        });
        const hasBody = ['post', 'put', 'delete'].includes(method);
        const requestPath = `${path}`;
        return this.http.request(method, requestPath, {
          headers: httpHeaders,
          body: hasBody ? params : {},
          params: !hasBody ? params : {},
        });
      }),
    );
  }
}
