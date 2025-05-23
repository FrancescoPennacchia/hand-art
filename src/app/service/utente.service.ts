import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from '../constants';
import {UtenteResponse} from '../model/utenteResponse.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Utente} from '../model/utente.model';

export interface Account {
  username: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private authToken: string;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private utente$: BehaviorSubject<UtenteResponse> = new BehaviorSubject<UtenteResponse>({} as UtenteResponse);

  constructor(private http: HttpClient, private storage: Storage) {

    this.storage.get(AUTH_TOKEN).then((token) => {
      console.log(token);
      this.authToken = token;
      if (token !== null && token !== undefined && token !== '') {
        this.loggedIn$.next(true);
      }
    });
    this.storage.get(UTENTE_STORAGE).then((utente) => {
      this.utente$.next(utente);
    });

  }

  login(account: Account): Observable<UtenteResponse> {
    return this.http.post<UtenteResponse>(URL.LOGIN, account, {observe: 'response'}).pipe(
      map((resp: HttpResponse<UtenteResponse>) => {
        const token = resp.body.token;
        console.log('header');
        console.log(resp.headers.get(X_AUTH));
        this.storage.set(AUTH_TOKEN, token);
        this.authToken = token;
        // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
        // profilo dell'utente stesso non si fa una chiamata REST.
        this.storage.set(UTENTE_STORAGE, resp.body);
        // update dell'observable dell'utente
        this.utente$.next(resp.body);
        this.loggedIn$.next(true);
        console.log('token');
        console.log(token);
        console.log(resp.body);
        return resp.body;
      }));
  }

  logout() {
    this.authToken = null;
    this.loggedIn$.next(true);
    this.storage.remove(AUTH_TOKEN);
    this.storage.remove(UTENTE_STORAGE);

    // Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
    // Per gestirlo si dovrebbe fare lato server una blacklist.
  }

  getUtente(): BehaviorSubject<UtenteResponse> {
    return this.utente$;
  }

  getAuthToken(): string {
    return this.authToken;
  }

  isLogged(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  registerUser(nuovoUtente: Utente): Observable<any> {
    return this.http.post( URL.REGISTER, nuovoUtente ).pipe(
      map((resp: HttpResponse<string>) => {
      return resp.body;
    }));
  }

  updateProfilo(nuovoUtente: UtenteResponse): Observable<UtenteResponse> {
    return this.http.post<UtenteResponse>(URL.UPDATE_PROFILO, nuovoUtente, {observe: 'response'}).pipe(
      map((resp: HttpResponse<UtenteResponse>) => {
        // Aggiornamento dell'utente nello storage.
        // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
        // e se l'utente chiude la app e la riapre i dati sono gia' presenti
        this.storage.set(UTENTE_STORAGE, resp.body);
        // update dell'observable dell'utente
        this.utente$.next(resp.body);
        return resp.body;
      }));
  }

}
