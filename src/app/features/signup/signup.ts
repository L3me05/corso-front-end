import {Component, inject, signal} from '@angular/core';
import {Alert} from '../../shared/components/alert';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth.service';
import {Token} from '../login/login';

@Component({
  selector: 'app-signup',
  imports: [
    Alert,
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export default class Signup {

  http = inject(HttpClient)
  router= inject(Router);
  error = signal(false);
  auth = inject(AuthService)
  errorMessage = 'Errore'


  signup(username: HTMLInputElement, password: HTMLInputElement) {

    this.http.post('http://localhost:8085/auth/signup', {
      username: username.value,
      password: password.value
    }, {
      responseType: 'text'
    })
      .subscribe({
        next: res => {
          console.log(res)
          this.router.navigateByUrl('/login')
        },
        error: err => {
          if(err instanceof HttpErrorResponse && err.status === 400 && err.error === 'Username already exists'){
            this.errorMessage="L'username non è disponibile"

          }
          this.error.set(true)
          console.log(this.errorMessage)
        }
      })



    console.log('username', username.value)
    console.log('password', password.value)

  }

}
