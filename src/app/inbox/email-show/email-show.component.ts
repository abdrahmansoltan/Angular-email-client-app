import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';
@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css',
})
export class EmailShowComponent {
  email: Email = {} as Email;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // get the fetched email from the route data (resolver)
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }
}
