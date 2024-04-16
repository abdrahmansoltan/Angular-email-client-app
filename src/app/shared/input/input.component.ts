import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl('');
  @Input() controlType: string = 'input';

  showErrors(): boolean {
    const { dirty, touched, errors } = this.control;
    return Boolean(dirty && touched && errors);
  }
}
