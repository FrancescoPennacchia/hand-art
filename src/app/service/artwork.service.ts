import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Artwork} from '../model/artwork/artwork.model';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {OperaPreferita} from '../model/artwork/operaPreferita';

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

  getRandomArtworkRest(): Observable<string> {
    return this.http.get<string>(URL.REST_RANDOM_ARTWORK);
  }

  getArtworksBySortRest(sort: string): Observable<string> {
    const params = new HttpParams().set('sort', String(sort));
    return this.http.get<string>(URL.REST_ARTWORKS_BY_SORT, {params});
  }

  getArtworksByOffsetRest(offset: number): Observable<string> {
    const params = new HttpParams().set('offset', String(offset));
    return this.http.get<string>(URL.REST_ARTWORK_LIST_OFFSET, {params});
  }

  getArtworkByIdRest(idArtwork: string ): Observable<string> {
    const apiURL = `${URL.REST_ARTWORK_BY_ID}/${idArtwork}`;
    return this.http.get<string>(apiURL);
  }

  // Parte dedicata alle opere preferite
  addFavoriteArtwork(opera: OperaPreferita){
    return this.http.post<OperaPreferita>(URL.REST_ADD_FAVORITE_ARTWORKS, opera);
  }

  deleteFavoriteArtwork(id: number){
    const params = new HttpParams().set('idOperaPreferita', String(id));
    return this.http.delete<OperaPreferita>(URL.REST_DELETE_FAVORITE_ARTWORKS, {params});
  }

  getFavoritesArtworks(id: number): Observable<OperaPreferita[]> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<OperaPreferita[]>(URL.REST_LIST_FAVORITE_ARTWORKS, {params});
  }

  getFavoriteArtwork(id_utente: number, id_artwork: string): Observable<OperaPreferita> {
    const params = new HttpParams().set('idUtente', String(id_utente)).set('idOpera', String(id_artwork));
    return this.http.get<OperaPreferita>(URL.REST_FAVORITE_ARTWORK, {params});
  }

}
