import {Component, inject, Input} from '@angular/core';
import {Card} from './card';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-enter-card',
  imports: [
    Card
  ],
  template: `

    @if (!auth.isLoggedIn()) {
      <div class="flex flex-col md:flex-wrap gap-2">

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
    } @else if (auth.isLoggedIn()) {
      <button class="btn" (click)="auth.logout()">Logout</button>
    }
  `,
  styles: ``
})
export class EnterCard {

  cardClass = 'bg-sky-900 text-primary-content w-100% '
  router = inject(Router)
  auth = inject(AuthService)


  login() {
    console.log('login')
    this.router.navigate(['login'])
  }

  signup() {
    console.log('signup')
    this.router.navigate(['signup'])
  }

}
