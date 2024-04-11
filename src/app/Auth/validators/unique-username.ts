import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {} // 👈 inject the HttpClient

  // Arrow function to bind the context of 'this'
  validate = (control: FormControl): any => {
    const { value } = control;

    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        map((value) => {
          if (value.available) {
            return null;
          }
          return { nonUniqueUsername: true };
        }),
        catchError((err) => {
          if (err.error?.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
