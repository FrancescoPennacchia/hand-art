import {Utente} from '../utente.model';

export interface ArtistaPreferito {
  id: number;
  id_autore: string;
  nome: string;
  image: string;
  utente: Utente;
}
