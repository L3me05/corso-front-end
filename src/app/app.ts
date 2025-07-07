import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './core/components/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'corso-front-end';
}
