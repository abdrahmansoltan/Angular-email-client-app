import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false); // BehaviorSubject is a type of Observable that stores the current value and emits it to new subscribers

  constructor(private http: HttpClient) {} // inject the HttpClient service

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        withCredentials: true, // send cookies along with the request
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true); // emit a new value to all subscribers that the user is signed in
        })
      );
  }

  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`).pipe(
      tap((response) => {
        if (response === true) {
          this.signedin$.next(true);
        }
      })
    );
  }
}
