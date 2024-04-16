import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css',
})
export class EmailCreateComponent {
  showModal = false;
  email: Email = {} as Email;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.username}@angular-email.com`,
    };
  }

  onComposeClick() {
    this.showModal = true;
  }

  onDismissClick() {
    this.showModal = false;
  }
}
