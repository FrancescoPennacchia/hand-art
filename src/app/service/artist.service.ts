import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Artwork} from '../model/artwork/artwork.model';


import {URL} from '../constants';

import {Observable} from 'rxjs';

import {Artist} from '../model/artist/artist.model';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  constructor(private http: HttpClient) {
  }

  /* PARTE RICHIESTE GRAPH */
  getPopularArtistGraph(size: number) {
    const params = new HttpParams().set('size', String(size));
    this.http.get(URL.GRAPH_POPULAR_ARTISTS, {params}).subscribe(data => {
      console.log(data);
;      return data.toString();
    });

  }

  getArtistByIdGraph(idArtist: string ): Observable<Artist> {
    const params = new HttpParams().set('idArtist', idArtist);
    return this.http.get<Artist>(URL.GRAPH_ARTIST_BY_ID, {params});
  }

  getArtistsListGraph(size: number): Observable<Artist[]> {
    const params = new HttpParams().set('size', String(size));
    return this.http.get<Artist[]>(URL.GRAPH_ARTISTS_LIST, {params});
  }

  /* PARTE RICHIESTE REST */
  getArtistByIdRest(idArtist: string ): Observable<string> {
    const apiURL = `${URL.REST_ARTIST_BY_ID}/${idArtist}`;
    return this.http.get<string>(apiURL);
  }

  getRandomArtistRest(): Observable<string> {
    return this.http.get<string>(URL.REST_RANDOM_ARTIST);
  }

  getArtistsBySortRest(sort: string): Observable<string> {
    const params = new HttpParams().set('sort', String(sort));
    return this.http.get<string>(URL.REST_ARTIST_BY_SORT, {params});
  }

  getArtistsByOffsetRest(offset: number): Observable<string> {
    const params = new HttpParams().set('offset', String(offset));
    return this.http.get<string>(URL.REST_ARTISTS_LIST_OFFSET, {params});
  }

  getArtistsBySizeRest(size: number): Observable<string> {
    const params = new HttpParams().set('size', String(size));
    return this.http.get<string>(URL.REST_ARTISTS_LIST_SIZE, {params});
  }


}
