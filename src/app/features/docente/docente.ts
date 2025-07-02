import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-docente',
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      docente works!
    </p>

    <pre>{{docenti() | json }}</pre>
  `,
  styles: ``
})
export default class Docente implements OnInit{

  http = inject(HttpClient)
  docenti = signal<Docente[]>([]);

  ngOnInit() {
    this.http.get<Docente[]>('http://localhost:8085/docenti/list')
      .subscribe( res => {
        console.log(res);
        this.docenti.set(res);
      })
  }
}
