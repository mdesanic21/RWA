import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { KorisniciI } from '../servisi/korisnicii';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss'
})
export class KorisniciComponent implements OnInit{

  korisnici: KorisniciI[] = [];
  errorMessage: string | null = null;

  constructor(private korisniciServis: KorisniciService){}

  ngOnInit(): void {
    this.dohvatiKorisnike();
  }
  
  async dohvatiKorisnike(){
    this.korisnici = await this.korisniciServis.dajKorisnike();
  }

  async obrisiKorisnika(korime: String) {
    const uspjeh = await this.korisniciServis.obrisiKorisnika(korime);
    if(uspjeh){
      window.location.reload();
    }else this.errorMessage = 'Greška prilikom brisanja korisnika!';
  }
}
