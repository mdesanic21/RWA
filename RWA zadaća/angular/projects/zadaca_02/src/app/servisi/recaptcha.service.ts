// recaptcha.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/envrionment';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  async generateRecaptchaToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(environment.recaptchaSiteKey, { action: 'submit' })
          .then((token) => resolve(token))
      });
    }) as Promise<string>;
  }
}
