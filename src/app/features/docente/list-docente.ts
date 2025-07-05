import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {Table} from '../../shared/components/table';
import {Card} from '../../shared/components/card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-docente',
  imports: [
    Table,
    RouterLink
  ],
  template: `

    <div
      class="flex flex-col w-full flex-wrap justify-end"
    >
      <div class="bg-sky-300 shadow-2xl backdrop-blur-lg p-8 rounded-4xl max-w-4xl mx-auto m-8 w-full">

        <app-table
          [items]="docenti"
          [rowStyle]="rowStyle"

        />
      </div>

      <div class="flex justify-end">
        <button
          class="btn mr-20 bg-sky-300 shadow-lg rounded-4xl px-8 py-6 "
          routerLink="create"
        >
          Crea un nuovo docente
        </button>


      </div>
    </div>






  `,
  styles: [`

  `]
})
export default class ListDocente implements OnInit{

  http = inject(HttpClient)
  docenti = signal<ListDocente[]>([]);


  rowStyle= "transition-all " +
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
    this.http.get<ListDocente[]>('http://localhost:8085/docenti/list')
      .subscribe( res => {
        console.log(res);
        this.docenti.set(res);
      })
  }
}
