import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../shared/components/table/table';
import {DocenteService} from "../../../core/services/docente.service";
import {Docente} from "../../../shared/model/Docente";
import {Router, RouterLink} from '@angular/router';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [
    Table,
    RouterLink
  ],
  templateUrl: './list-docente.html',
  styleUrl: './list-docente.css'
})
export default class ListDocente implements OnInit {
  http = inject(HttpClient);
  docenti = signal<Docente[]>([]);
  docenteService = inject(DocenteService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  rowStyle = "transition-all " +
    "duration-300  " +
    "hover:shadow-[0_8px_15px_rgba(0,0,0,0.3)] " +
    "hover:scale-105  " +
    "hover:translate-y-[-4px] " +
    "rounded-[1.5rem] " +
    "b p-4 " +
    "border-none " +
    "outline-none " +
    "text-md"


  ngOnInit() {
    this.docenteService.getDocente()
      .subscribe(res => {
        console.log(res);
        this.docenti.set(res);
      })
  }

  delete(item: Docente) {
    this.docenteService.deleteDocente(item.id).subscribe({
      next: () => {
        this.docenti.update(arr => arr.filter(d => d.id !== item.id));
      },
      error: err => console.error('Delete failed', err)
    });
  }

  edit(item: Docente) {
    console.log('Navigazione a edit per docente:', item.id);
    // Usa la navigazione relativa
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }
}
