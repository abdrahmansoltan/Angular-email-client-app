import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

export interface Email {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
}

export interface EmailPayload {
  subject: string;
  text: string;
  to: string;
}

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

  sendEmail(email: EmailPayload) {
    return this.http.post(`${this.rootUrl}/emails`, email);
  }
}
