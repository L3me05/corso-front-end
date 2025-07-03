import { Component } from '@angular/core';
import {Card} from '../../shared/components/card';

@Component({
  selector: 'app-home',
  imports: [
    Card
  ],
  template: `
    <p>
      home works!
    </p>

    <app-card
      title="Accedi"
      label="login"
      [cardClass]="cardClass"

    >

    </app-card>
  `,
  styles: ``
})
export default class Home {
  cardClass = 'bg-info text-primary-content w-100'

}
