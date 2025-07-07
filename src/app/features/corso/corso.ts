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
  template: `
    <p>
      corso works!
    </p>

    <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 p-6">
      @for (corso of corsi(); track corso.nome) {
        <div class="break-inside-avoid mb-8">
          <app-card
            cardClass="bg-sky-300 p-6 w-full flex flex-col rounded-3xl shadow-lg"
            [title]="corso.nome + ' (' + corso.annoAccademico + ')'"
            titleStyle="text-center text-2xl font-semibold border-b-2 p-4"
          >
            <div class="mt-6 flex flex-col gap-6">
              <!-- Docente -->
              <div class="flex flex-col gap-3">
                <h2 class="text-lg font-bold text-blue-800">Docente</h2>
                <div class="ml-4 text-md text-gray-700">
                  {{corso.docente.nome}} {{corso.docente.cognome}}
                </div>
              </div>

              <!-- Discenti -->
              <div class="flex flex-col gap-3">
                <h2 class="text-lg font-bold text-blue-800">Discenti</h2>
                @for (discente of corso.discenti; track discente.nome) {
                  <div class="ml-4 text-md text-gray-700">
                    {{discente.nome}} {{discente.cognome}}
                  </div>
                }
              </div>
            </div>
          </app-card>
        </div>
      }
    </div>


    <pre>{{corsi() | json}}</pre>
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
