import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {URL} from '../constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private http: HttpClient) {
  }

  getSearch(value: string ): Observable<any> {
    const params = new HttpParams().set('value', encodeURI(value));
    return this.http.get<string>(URL.REST_SEARCH, {params});
  }

}
