import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-docente',
  imports: [],
  template: `
    <p>
      docente works!
    </p>
  `,
  styles: ``
})
export default class Docente implements OnInit{

  http = inject(HttpClient)

  ngOnInit() {
    this.http.get('http://localhost:8080/docenti/list')
      .subscribe( res => {
        console.log(res);
      })
  }
}
