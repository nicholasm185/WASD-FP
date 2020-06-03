import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, public auth: AuthService) { }

  intercept(req, next) {
    // console.log('here');
    let auth = this.injector.get(AuthService);
    let tokenizedRequest = req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      });
    return next.handle(tokenizedRequest);
  }
}
