import {Component, inject, OnInit, signal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {HttpClient} from '@angular/common/http';
import {Discente} from '../../../shared/model/Discente';
import {RouterLink} from '@angular/router';

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

  rowStyle = "text-lg"

  ngOnInit(): void {
    this.http.get<Discente[]>('http://localhost:8085/discenti/list')
      .subscribe(res => {
        this.discenti.set(res);
      });
  }
}
