import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Artwork} from '../model/artwork/artwork.model';


import {URL} from '../constants';

import {Observable} from 'rxjs';

import {Artist} from '../model/artist/artist.model';
import {catchError, map, tap} from 'rxjs/operators';
import {OperaPreferita} from '../model/artwork/operaPreferita';
import {ArtistaPreferito} from '../model/artist/artistaPreferito';

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  constructor(private http: HttpClient) {
  }

  /* PARTE RICHIESTE GRAPH */
  getPopularArtistGraph(size: number): Observable<Artist[]> {
    const params = new HttpParams().set('size', String(size));
    return this.http.get<Artist[]>(URL.GRAPH_POPULAR_ARTISTS, {params});
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


  // Parte dedicata agli artisti preferiti
  addFavoriteArtist(artista: ArtistaPreferito){
    return this.http.post<ArtistaPreferito>(URL.REST_ADD_FAVORITE_ARTISTS, artista);
  }

  deleteFavoriteArtist(id: number){
    const params = new HttpParams().set('idUtente', String(id));
    return this.http.delete<ArtistaPreferito>(URL.REST_DELETE_FAVORITE_ARTISTS, {params});
  }

  getFavoritesArtists(id: number): Observable<ArtistaPreferito[]> {
    const params = new HttpParams().set('idUtente', String(id));
    return this.http.get<ArtistaPreferito[]>(URL.REST_LIST_FAVORITE_ARTISTS, {params});
  }

  getFavoriteArtist(id_utente: number, id_artist: string): Observable<ArtistaPreferito> {
    const params = new HttpParams().set('idUtente', String(id_utente)).set('idAutore', id_artist);
    return this.http.get<ArtistaPreferito>(URL.REST_FAVORITE_ARTIST, {params});
  }

}
