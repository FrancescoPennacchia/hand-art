import {Utente} from '../utente.model';

export interface OperaPreferita {
  id: number;
  id_opera: string;
  titolo: string;
  image: string;
  utente: Utente;
}
