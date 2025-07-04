import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token = signal<string | null>(sessionStorage.getItem('jwt_token'));

  readonly isLoggedIn = computed( () => this._token() !== null);

  setToken(token: string) {
    sessionStorage.setItem('jwt_token', token);
    this._token.set(token);
  }

  getToken(): string | null {
    return this._token();
  }

  logout() {
    sessionStorage.removeItem('jwt_token');
    this._token.set(null);
  }


}
