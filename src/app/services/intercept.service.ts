import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {
  accessToken: any = localStorage.getItem('accessToken');
  constructor(
    public loaderService: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.accessToken = localStorage.getItem('accessToken');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken = localStorage.getItem('accessToken');
    if ( req.url.indexOf('logs/unreadCountOfLog') == -1 ) {
      this.loaderService.display(true);
    }
    if (this.accessToken) {
      req = req.clone({
        headers: req.headers.set('token',
          this.accessToken)
      });
    }
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if ( req.url.indexOf('logs/unreadCountOfLog') == -1 ) {
              this.loaderService.display(false);
            }
          }
        }
      ), catchError(error => {
        this.loaderService.display(false);
        return throwError(error);
      })
    );
  }
}
