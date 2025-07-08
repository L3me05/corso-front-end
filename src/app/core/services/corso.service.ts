import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Corso} from '../../shared/model/Corso';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {
  http = inject(HttpClient)

  getCorso(): Observable<Corso[]> {
    return this.http.get<Corso[]>('http://localhost:8085/corsi/list');
  }

  createCorso(data: Corso): Observable<Corso> {
    return this.http.post<Corso>('http://localhost:8085/corsi', data);
  }

  deleteCorso(id: number): Observable<any> {
    return  this.http.delete(`http://localhost:8085/corsi/${id}`);
  }

  updateCorso(id: number, data: Corso): Observable<Corso> {
    return this.http.put<Corso>(`http://localhost:8085/corsi/${id}`, data);
  }

  getCorsoById(id: number): Observable<Corso> {
    return this.http.get<Corso>('http://localhost:8085/corsi/findById', { params: { id } });
  }

}
