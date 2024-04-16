import { Component } from '@angular/core';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css',
})
export class EmailCreateComponent {
  showModal = false;
  email: Email = {} as Email;

  ngOnInit() {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: '',
    };
  }

  onComposeClick() {
    this.showModal = true;
  }

  onDismissClick() {
    this.showModal = false;
  }
}
