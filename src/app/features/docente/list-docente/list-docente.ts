import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {Table} from '../../../shared/components/table/table';
import {Card} from '../../../shared/components/card';
import {RouterLink} from '@angular/router';
import {DocenteService} from "../../../core/services/docente.service";
import {Docente} from "../../../shared/model/Docente";

@Component({
  selector: 'app-docente',
  imports: [
    Table,
    RouterLink
  ],
  templateUrl: './list-docente.html',
  styleUrl: './list-docente.css'
})
export default class ListDocente implements OnInit {

  http = inject(HttpClient)
  docenti = signal<Docente[]>([]);
  docenteService = inject(DocenteService)
  id: number | undefined;


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
    console.log(item.id)
    this.id = item.id;
    this.docenteService.deleteDocente(this.id).subscribe({
      next: () => {
        this.docenti.update(arr => arr.filter(d => d.id !== item.id));
        this.docenteService.getDocente()

      },
      error: err => console.error('Delete failed', err)
    });
  }

}
