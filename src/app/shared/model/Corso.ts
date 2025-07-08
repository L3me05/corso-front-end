import {Docente} from './Docente';
import {Discente} from './Discente';


export interface Corso {
  id: number;
  nome: string;
  annoAccademico: number;
  docente: Docente;
  discenti: Discente[];
}
