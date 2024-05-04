import { Component } from '@angular/core';
import { KorisniciI } from '../servisi/korisnicii';
import { KorisniciService } from '../servisi/korisnici.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moj-profil',
  templateUrl: './moj-profil.component.html',
  styleUrl: './moj-profil.component.scss'
})
export class MojProfilComponent {
  korisnik: KorisniciI | null = null;

  constructor(private korisniciServis: KorisniciService, private router: Router) {}

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

  azurirajKorisnikaNav() {
    this.router.navigate(['/profil/' + this.korisnik?.korime]);
  }
}
