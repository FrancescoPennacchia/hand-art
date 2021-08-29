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

  getArtistByIdRest(value: string ): Observable<string> {
    const apiURL = `${URL.REST_SEARCH}/${value}`;
    return this.http.get<string>(apiURL);
  }

}
