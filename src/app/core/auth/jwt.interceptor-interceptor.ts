import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, of} from 'rxjs';
import {Router} from '@angular/router';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('jwt_token');
  const router = inject(Router);
  let cloneReq = req;

  if (token) {
    cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+token)
    })
  }
  return next(req)
    .pipe(
      catchError( err => {
        if (err instanceof HttpErrorResponse) {
          console.log('error', err)
          switch (err.status) {
            case 0:
              // do something
              console.log('redirect to login')
              router.navigateByUrl('demo1')
              break;

            case 401:
            case 404:
              // do something
              console.log('redirect to login')
              break;

            //...
          }
        }
        return of(err);
      })
    )
};
