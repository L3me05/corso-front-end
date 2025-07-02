import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li routerLinkActive="text-sky-400" routerLink="home"><a>Home</a></li>
          <li routerLinkActive="text-sky-400" routerLink="corso"><a>Corso</a></li>
          <li routerLinkActive="text-sky-400" routerLink="discente"><a>Discente</a></li>
          <li routerLinkActive="text-sky-400" routerLink="docente"><a>Docente</a></li>


        </ul>
      </div>
    </div>
  `,
  styles: ``
})
export class Navbar {

}
