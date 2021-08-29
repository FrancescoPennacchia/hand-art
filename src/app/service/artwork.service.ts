import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Artwork} from '../model/artwork/artwork.model';
import {URL} from '../constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArtworkService {
  constructor(private http: HttpClient) {
  }

  /* PARTE RICHIESTE GRAPH */
  getArtworkByIdGraph(idArtwork: string): Observable<Artwork> {
    const params = new HttpParams().set('idArtwork', idArtwork);
    return this.http.get<Artwork>(URL.GRAPH_ARTWORK, {params});
  }

  /* PARTE RICHIESTE REST */
  getArtworksBySizeRest(size: number): Observable<string> {
    const params = new HttpParams().set('size', String(size));
    return this.http.get<string>(URL.REST_ARTWORK_LIST_SIZE, {params});
  }

  getRandomArtistRest(): Observable<string> {
    return this.http.get<string>(URL.REST_RANDOM_ARTWORK);
  }

  getArtistsBySortRest(sort: string): Observable<string> {
    const params = new HttpParams().set('sort', String(sort));
    return this.http.get<string>(URL.REST_ARTWORKS_BY_SORT, {params});
  }

  getArtistsByOffsetRest(offset: number): Observable<string> {
    const params = new HttpParams().set('offset', String(offset));
    return this.http.get<string>(URL.REST_ARTWORK_LIST_OFFSET, {params});
  }

  getArtworkByIdRest(idArtwork: string ): Observable<string> {
    const apiURL = `${URL.REST_ARTWORK_BY_ID}/${idArtwork}`;
    return this.http.get<string>(apiURL);
  }

}
