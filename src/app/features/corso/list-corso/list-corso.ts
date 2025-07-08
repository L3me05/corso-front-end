import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../../../shared/components/card';
import {Corso} from '../../../shared/model/Corso';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CorsoService} from '../../../core/services/corso.service';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [
    Card,
    RouterLink
  ],
  templateUrl: './list-corso.html',
  styleUrl: './list-corso.css'
})
export default class ListCorso implements OnInit {
  private http = inject(HttpClient);
  protected corsi = signal<Corso[]>([]);
  router = inject(Router)
  route = inject(ActivatedRoute)
  coroService = inject(CorsoService)

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

  delete(item: Corso) {
    this.coroService.deleteCorso(item.id).subscribe({
      next: res => this.corsi.update(arr => arr.filter(c => c.id !== item.id)),
      error: err => console.error('Delete failed', err)
    })
  }

  edit(item: Corso) {
    this.router.navigate(['edit', item.id], {relativeTo: this.route})
  }
}
