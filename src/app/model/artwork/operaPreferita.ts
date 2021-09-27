import {Utente} from '../utente.model';

export class OperaPreferita {
  id: number;
  id_opera: string;
  titolo: string;
  image: string;
  utente: Utente;
}
