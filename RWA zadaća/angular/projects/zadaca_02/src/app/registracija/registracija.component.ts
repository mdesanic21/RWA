import { Component } from '@angular/core';
import { KorisniciI } from '../servisi/korisnicii';
import { KorisniciService } from '../servisi/korisnici.service';
import { RecaptchaService } from '../servisi/recaptcha.service';
@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {
  korisnik: KorisniciI = {
    ime: '',
    prezime: '',
    korime: '',
    email: '',
    lozinka: ''
  };

  constructor(private korisniciServis: KorisniciService, private recaptchaServis: RecaptchaService) {}

  async submitForm() {
    try {
      const token = await this.recaptchaServis.generateRecaptchaToken();
      const success = await this.korisniciServis.registrirajKorisnika(this.korisnik, token);

      if (success) {
        console.log('User registered successfully.');
      } else {
        console.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error registering user', error);
    }
  }
}
