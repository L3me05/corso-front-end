import {Component, inject, OnInit, signal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {HttpClient} from '@angular/common/http';
import {Discente} from '../../../shared/model/Discente';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DiscenteService} from '../../../core/services/discente.service';

@Component({
  selector: 'app-list-discente',
  standalone: true,
  imports: [Table, RouterLink],
  templateUrl: './list-discente.html',
  styleUrl: './list-discente.css'
})
export default class ListDiscente implements OnInit {
  private readonly http = inject(HttpClient);
  discenti = signal<Discente[]>([]);
  discenteService = inject(DiscenteService);
  router = inject(Router);
  route = inject(ActivatedRoute)

  rowStyle = "text-lg"

  ngOnInit(): void {
    this.discenteService.getDiscente().subscribe({
      next: res => {
        this.discenti.set(res)
      },
      error: err => {
        console.error('Inserimento discenti fallita', err)
      }
    })
  }

  delete(item: Discente) {
    this.discenteService.deleteDiscente(item.id).subscribe({
      next: res => {
        this.discenti.update(arr => arr.filter(d => d.id !== item.id));
      },
      error: err => console.error('Delete failed', err)
    });
  }

  edit(item: Discente) {
      this.router.navigate(['edit', item.id], {relativeTo: this.route})
  }


}
