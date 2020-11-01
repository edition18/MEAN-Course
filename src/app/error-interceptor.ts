import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';


@Injectable() //now we want to inject as service
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorComponent)
        alert(error.error.error.message)
        // we still need to return the request, EVEN if its an error
        return throwError(error); //throwError is a observable from rxjs
      })
    );
  }
}
