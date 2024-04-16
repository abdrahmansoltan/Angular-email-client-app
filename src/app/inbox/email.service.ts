import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email, EmailPayload, EmailSummary } from './email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(payload: EmailPayload) {
    return this.http.post(`${this.rootUrl}/emails`, payload);
  }
}
