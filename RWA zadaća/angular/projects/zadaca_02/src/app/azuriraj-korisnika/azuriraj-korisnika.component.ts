import { Component } from '@angular/core';
import { KorisniciI } from '../servisi/korisnicii';
import { KorisniciService } from '../servisi/korisnici.service';
import { __param } from 'tslib';
import { Router } from '@angular/router';
import { RecaptchaService } from '../servisi/recaptcha.service';

@Component({
  selector: 'app-azuriraj-korisnika',
  templateUrl: './azuriraj-korisnika.component.html',
  styleUrl: './azuriraj-korisnika.component.scss'
})
export class AzurirajKorisnikaComponent {
  korisnik: KorisniciI | null = null;
  lozinkaNova: String = '';

  constructor(private korisniciServis: KorisniciService, private recaptchaServis: RecaptchaService, private router: Router) {}

  ngOnInit() {
    const korime = sessionStorage.getItem('korime');
    if (korime) {
      this.dohvatiKorisnika(korime);
    }
  }

  private async dohvatiKorisnika(korime: string) {
    try {
      this.korisnik = await this.korisniciServis.dajKorisnika(korime);
      console.log(this.korisnik);
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  }
  
  async azurirajKorisnika() {
    if (this.korisnik) {
      try {
        if(this.lozinkaNova !== ''){
          console.log('nije prazno');
          const updatedIme = this.korisnik.ime;
          const updatedPrezime = this.korisnik.prezime;
          const updatedKorime = this.korisnik.korime;
          const updatedEmail = this.korisnik.email;
          const updatedLozinka = this.lozinkaNova;
  
          this.korisnik = {
            ime: updatedIme,
            prezime: updatedPrezime,
            korime: updatedKorime,
            email: updatedEmail,
            lozinka: updatedLozinka,
        };
        } else{
          console.log("prazno");
            const updatedIme = this.korisnik.ime;
            const updatedPrezime = this.korisnik.prezime;
            const updatedKorime = this.korisnik.korime;
            const updatedEmail = this.korisnik.email;
            const updatedLozinka = this.korisnik.lozinka;
          
            this.korisnik = {
              ime: updatedIme,
              prezime: updatedPrezime,
              korime: updatedKorime,
              email: updatedEmail,
              lozinka: updatedLozinka
            };
            console.log("koirnisk", this.korisnik.lozinka);
        }
        console.log(this.korisnik);
        console.log('Sending update request to the server...', this.korisnik);
        const recaptcha = await this.recaptchaServis.generateRecaptchaToken();
        const success = await this.korisniciServis.azurirajKorisnika(this.korisnik, recaptcha);
  
        if (success) {
          console.log('User updated successfully.');
          this.router.navigate(['/profil']);
        } else {
          console.error('Failed to update user.');
        }
      } catch (error) {
        console.error('Error updating user', error);
      }
    }
  }
  
}
