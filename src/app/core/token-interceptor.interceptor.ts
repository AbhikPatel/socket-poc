import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { CommonService } from '../shared/common.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _service: CommonService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token')
    this._service.loader.next(true)
    const modifiedReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`), });
    return next.handle(modifiedReq).pipe(
      finalize(() => this._service.loader.next(false))
    );
  }
}
