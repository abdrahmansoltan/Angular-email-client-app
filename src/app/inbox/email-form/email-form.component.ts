import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css',
})
export class EmailFormComponent {
  emailForm: any;
  @Input() email: Email = {} as Email;
  @Output() send = new EventEmitter();

  constructor() {}

  ngOnInit() {
    const { subject, from, to, text } = this.email;

    // initializing the FormGroup here, to make sure that the email input property is available
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    // send the email
    this.send.emit(this.emailForm.value);
    // reset the form
    this.emailForm.reset();
  }
}
