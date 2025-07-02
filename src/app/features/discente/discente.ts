import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-discente',
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      discente works!
    </p>

    <pre>{{discenti() | json}}</pre>
  `,
  styles: ``
})
export default class Discente implements OnInit{
  http = inject(HttpClient)
  discenti = signal<Discente[]>([]);

  ngOnInit() {
    this.http.get<Discente[]>('http://localhost:8085/discenti/list')
      .subscribe( res => {
        console.log(res);
        this.discenti.set(res);
      })
  }

}
