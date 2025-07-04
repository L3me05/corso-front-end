import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {Card} from '../../shared/components/card';
import {Corso} from '../../model/Corso';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [
    Card
  ],
  template: `
    <p>
      corso works!
    </p>

    <div class="flex flex-wrap gap-4 p-4 ">
      @for (corso of corsi(); track corso.nome) {
        <div class="">
          <app-card
            cardClass="bg-sky-300 "
            [title]="corso.nome"
          >
            {{corso?.nome}}
            <br>
            Anno Accademico: {{corso?.annoAccademico}}
          </app-card>
        </div>
      }
    </div>
  `,
  styles: ``
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
