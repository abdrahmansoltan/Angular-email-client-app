import { Component, Input } from '@angular/core';
import { Email, EmailPayload } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css',
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: Email = {} as Email;

  constructor(private emailService: EmailService) {}

  ngOnChange() {
    const text = this.email.text.replace(/\n/g, '\n> ');

    this.email = {
      ...this.email,
      subject: `Re: ${this.email.subject}`,
      to: this.email.from,
      from: this.email.to,
      text: `\n\n\n-------- ${this.email.from} wrote:\n> ${text}`,
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
