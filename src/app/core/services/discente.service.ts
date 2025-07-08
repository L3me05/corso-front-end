import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Discente} from '../../shared/model/Discente';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscenteService {
  http = inject(HttpClient);

  getDiscente(): Observable<Discente[]> {
    return this.http.get<Discente[]>('http://localhost:8085/discenti/list');
  }

  createDiscente(data: Discente): Observable<Discente> {
    return this.http.post<Discente>('http://localhost:8085/discenti', data);
  }

  deleteDiscente(id: number): Observable<any> {
    return  this.http.delete(`http://localhost:8085/discenti/${id}`);
  }

  updateDiscente(id: number, data: Discente): Observable<Discente> {
    return this.http.put<Discente>(`http://localhost:8085/discenti/${id}`, data);
  }

  getDiscenteById(id: number): Observable<Discente> {
    return this.http.get<Discente>('http://localhost:8085/discenti/findById', { params: { id } });
  }




}
