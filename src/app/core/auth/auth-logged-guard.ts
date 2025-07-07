import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const authLoggedGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLoggedIn()) {
    alert('Non sei loggato')
    return router.parseUrl('/home')
  }
  return true;
};
