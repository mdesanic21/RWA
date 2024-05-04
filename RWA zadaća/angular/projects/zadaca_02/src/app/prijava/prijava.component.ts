import { Component } from '@angular/core';
import { KorisniciI } from '../servisi/korisnicii';
import { KorisniciService } from '../servisi/korisnici.service';
import { Router } from '@angular/router';
import { RecaptchaService } from '../servisi/recaptcha.service';
@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  korime: string = '';
  lozinka: string = '';
  token: String = '';
  loginError: boolean = false;
  loading: boolean = false; 

  constructor(private korisniciServis: KorisniciService, private router: Router, private recaptchaServis: RecaptchaService) {}

  async submitForm() {
    try {
      this.loading = true; 
      this.token = await this.recaptchaServis.generateRecaptchaToken();
      const odgovor = await this.korisniciServis.prijaviKorisnika(this.korime, this.lozinka, this.token);
      if (odgovor) {
        console.log('Login successful');
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.loading = false;
        this.loginError = true;
        this.korime = '';
        this.lozinka = '';
      }
    } catch (error) {
      console.error('Error during login', error);
      this.loginError = true;
    }
  }

  async githubLogin() {
    window.location.href = await this.korisniciServis.gitHubLoginServisRedirect();
  }
}
