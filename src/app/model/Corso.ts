import {Docente} from './Docente';
import {Discente} from './Discente';


export interface Corso {
  nome: string;
  annoAccademico: number;
  docente: Docente;
  discenti: Discente[];
}
