import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, throwError} from 'rxjs';
import {OfflineAuthService} from '../service';
import {catchError, filter, take} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _refreshingToken = new BehaviorSubject<boolean>(false);
  private _refreshingToken$ = this._refreshingToken.asObservable();

  constructor(private readonly offlineAuthService: OfflineAuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthenticationToken(httpRequest)).pipe(
      catchError(error => {
        // it's not an inactive token error
        if (error instanceof HttpErrorResponse && error.status !== HttpStatusCode.Unauthorized) {
          return throwError(() => error);
        }

        // the token is being refreshed
        if (this._refreshingToken.getValue()) {
          return this._refreshingToken$.pipe(
            filter(refreshing => !refreshing),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(httpRequest)))
          );
        }

        this._refreshingToken.next(true);

        // refresh token
        return this.offlineAuthService.updateToken().pipe(
          switchMap(() => {
            this._refreshingToken.next(false);
            return next.handle(this.addAuthenticationToken(httpRequest));
          })
        );
      })
    );
  }

  private addAuthenticationToken(httpRequest: HttpRequest<any>): HttpRequest<any> {
    return httpRequest.clone({setHeaders: {Authorization: `Bearer ${this.offlineAuthService.token}`}});
  }
}
