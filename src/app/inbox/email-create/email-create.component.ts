import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Email, EmailPayload } from '../email';
import { EmailService } from '../email.service';

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
    private emailService: EmailService
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

  onSendClick(payload: EmailPayload) {
    this.emailService.sendEmail(payload).subscribe(() => {
      this.showModal = false;
    });
  }
}
