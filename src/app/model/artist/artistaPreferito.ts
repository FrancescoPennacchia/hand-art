import {Utente} from '../utente.model';

export class ArtistaPreferito {
  id: number;
  id_autore: string;
  nome: string;
  image: string;
  utente: Utente;
}
