import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {Card} from '../../shared/components/card';
import {Corso} from '../../shared/model/Corso';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [
    Card,
    JsonPipe
  ],
  templateUrl: './corso.html',
  styleUrl: './corso.css'
})
export default class CorsoComponent implements OnInit {
  private http = inject(HttpClient);
  protected corsi = signal<Corso[]>([]);

  ngOnInit() {
    this.http.get<Corso[]>('http://localhost:8085/corsi/list')
      .subscribe({
        next: (res) => {
          console.log('Dati ricevuti:', res);
          this.corsi.set(res);
        },
        error: (err) => console.error('Errore:', err)
      });
  }
}
