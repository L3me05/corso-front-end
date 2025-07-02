import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-corso',
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      corso works!
    </p>

    <pre>{{corsi() | json}}</pre>
  `,
  styles: ``
})
export default class Corso implements OnInit{

  http = inject(HttpClient)
  corsi = signal<Corso[]>([]);

  ngOnInit() {
    this.http.get<Corso[]>('http://localhost:8085/corsi/list')
      .subscribe( res => {
        console.log(res);
        this.corsi.set(res);
      })
  }
}
