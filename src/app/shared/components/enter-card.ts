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
          title="Accedi o Registrati"
          label="login"
          [cardClass]="cardClass"
          (action)= "login()"
          variant="btn ml-auto bg-base-100 text-sky-800 hover:text-sky-400 hover:border-sky-400 rounded-2xl"
          label2="signup"
          (action2)="signup()"
          variant2="btn ml-2 bg-base-100 text-sky-800 hover:text-sky-400 hover:border-sky-400 rounded-2xl "
        >

        </app-card>

      </div>
    } @else if (auth.isLoggedIn()) {
      <button class="btn bg-base-100 text-sky-800 hover:text-sky-400 hover:border-sky-400" (click)="auth.logout()">Logout</button>
    }
  `,
  styles: ``
})
export class EnterCard {

  cardClass = 'bg-base-100 border-2 text-sky-800 w-100% '
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
