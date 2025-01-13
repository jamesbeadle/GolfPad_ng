import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userPromise = Promise.resolve(this.auth.currentUser);

    return from(userPromise).pipe(
      switchMap(user => {
        if (!user) {
          return next.handle(req);
        }

        return from(user.getIdToken(true)).pipe(
          switchMap(token => {
            console.log(token);
            const authReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(authReq);
          })
        );
      })
    );
  }
}
