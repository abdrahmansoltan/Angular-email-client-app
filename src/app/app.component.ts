import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$; // set the signedin$ BehaviorSubject to the signedin$ BehaviorSubject from the AuthService
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {}); // call the checkAuth method from the AuthService
  }
}
