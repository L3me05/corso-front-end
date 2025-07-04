import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';

export function jwtInterceptorInterceptor
(req: HttpRequest<unknown>,
 next: HttpHandlerFn) : Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const router = inject(Router);

  let cloneReq = req;

  if (token) {
    cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
  }

  return next(cloneReq)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          console.log('HTTP Error', err);

          switch (err.status) {
            case 0:
            case 401:
            case 403:
              if(auth.isLoggedIn()) {
                alert('Non hai i permessi per accedere a questa pagina')
                router.navigateByUrl('/home');
              } else {
                router.navigateByUrl('/login');
                alert('Non sei loggato')
              }
              break;

          }
        }

        return throwError(err);
      })
  );
}
