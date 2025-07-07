import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {routes} from '../../app.routes';
import {Alert} from '../../shared/components/alert';
import {AuthService} from '../../core/auth/auth.service';

export interface Token {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    FormsModule,
    Alert
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export default class Login {

  http = inject(HttpClient)
  router= inject(Router);
  error = signal(false);
  auth = inject(AuthService)


  login(username: HTMLInputElement, password: HTMLInputElement) {

    this.http.post<Token>('http://localhost:8085/auth/login', {
      username: username.value,
      password: password.value
    })
      .subscribe({
        next: res => {
          this.auth.setToken(res.token)
          this.router.navigateByUrl('/home')
        },
        error: () => {
          this.error.set(true)
          console.log('error')
        }
      })



    console.log('username', username.value)
    console.log('password', password.value)

  }



}
