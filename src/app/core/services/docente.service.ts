import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Docente} from '../../shared/model/Docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  http = inject(HttpClient);

  createDocente(data: Docente): Observable<Docente> {
    return this.http.post<Docente>('http://localhost:8085/docenti', data);
  }


  deleteDocente(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8085/docenti/${id}`);
}

  getDocente(): Observable<Docente[]> {
    return this.http.get<Docente[]>('http://localhost:8085/docenti/list');
  }

  getDocenteById(id: any): Observable<Docente> {
    return this.http.get<Docente>(`http://localhost:8085/docenti/findById`,{params: {id: id}} );
  }

  updateDocente(id: number, data: Docente): Observable<Docente> {
    return this.http.put<Docente>(`http://localhost:8085/docenti/${id}`, data);
  }

}
