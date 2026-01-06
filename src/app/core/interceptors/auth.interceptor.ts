import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor that adds an Authorization header to outgoing HTTP requests.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  /**
   * Intercepts HTTP requests and adds an Authorization header.
   * @param req The outgoing HTTP request.
   * @param next The next handler in the chain.
   * @returns An Observable of the intercepted HTTP event.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Test")

    const token = localStorage.getItem('token') || 'fake-jwt-token';

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('[HTTP REQUEST]', authReq.method, authReq.url);

    return next.handle(authReq);
  }
}
