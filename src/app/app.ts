import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './core/components/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <div class="max-w-screen-lg mx-3 lg:mx-auto">
      <router-outlet />
    </div>
  `,
  styles: [],
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'corso-front-end';
}
