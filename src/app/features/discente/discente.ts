import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {Table} from '../../shared/components/table';

@Component({
  selector: 'app-discente',
  imports: [
    Table
  ],
  template: `

    <div class="bg-sky-300 shadow-2xl backdrop-blur-lg p-8 rounded-4xl max-w-4xl mx-auto m-8">

      <app-table
        [items]="discenti"
        [rowStyle]="rowStyle"

      />
    </div>
  `,
  styles: ``
})
export default class Discente implements OnInit{
  http = inject(HttpClient)
  discenti = signal<Discente[]>([]);

  rowStyle= "transition-all " +
    "duration-300  " +
    "hover:shadow-[0_8px_15px_rgba(0,0,0,0.3)] " +
    "hover:scale-105  " +
    "hover:translate-y-[-4px] " +
    "rounded-[1.5rem] " +
    "b p-4 " +
    "border-none " +
    "outline-none " +
    "text-sm"

  ngOnInit() {
    this.http.get<Discente[]>('http://localhost:8085/discenti/list')
      .subscribe( res => {
        console.log(res);
        this.discenti.set(res);
      })
  }

}
