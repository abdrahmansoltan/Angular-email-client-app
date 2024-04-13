import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SigninCredentials } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]*$'), // letters and numbers
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const credentials = this.authForm.value as SigninCredentials;

    this.authService.signin(credentials).subscribe({
      next: (response) => {
        console.log('Signed in');
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else if (err.error?.username || err.error?.password) {
          this.authForm.setErrors({ invalidCredentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
