import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {} // inject the AuthService service

  // Arrow function to bind the context of 'this'
  validate = (control: FormControl): any => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
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
