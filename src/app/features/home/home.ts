import {Component, inject} from '@angular/core';
import {Card} from '../../shared/components/card';
import {Router} from '@angular/router';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-home',
  imports: [
    Card
  ],
  template: `
    <p>
      home works!
    </p>
    <div class="flex gap-2">

      <app-card
        title="Accedi"
        label="login"
        [cardClass]="cardClass"
        (action)= "login()"
      >

      </app-card>

      <app-card
        title="Registrati"
        label="signup"
        [cardClass]="cardClass"
        (action)="signup()"
      >

      </app-card>
    </div>
  `,
  styles: ``
})
export default class Home {
  cardClass = 'bg-info text-primary-content w-100'
  router = inject(Router)

  login() {
    console.log('login')
    this.router.navigate(['login'])
  }

  signup() {
    console.log('signup')
    this.router.navigate(['signup'])
  }

}
