import { Component } from '@angular/core';

@Component({
  selector: 'app-dokumentacija',
  templateUrl: './dokumentacija.component.html',
  styleUrl: './dokumentacija.component.scss'
})
export class DokumentacijaComponent {
  authorInfo = {
    ime: 'Matej',
    prezime: 'Desanić',
    email: 'mdesanic21@foi.hr'
  };

  resources = [
    { url: '/baza/korisnici', get: 'implementirano', post: 'implementirano', put: 'implementirano', delete: 'implementirano' },
    { url: '/baza/korisnici/{korime}', get: 'implementirano', post: 'implementirano', put: 'implementirano', delete: 'implementirano' },
    { url: '/baza/korisnici/{korime}/prijava', get: 'implementirano', post: 'implementirano', put: 'implementirano', delete: 'implementirano' },
    { url: '/baza/favoriti', get: 'nije implementirano', post: 'nije implementirano', put: 'implementirano', delete: 'implementirano' },
    { url: '/baza/favoriti/{id}', get: 'nije implementirano', post: 'nije implementirano', put: 'nije implementirano', delete: 'nije implementirano' },
    { url: 'baza/dnevnik ?stranica=broj &sortiraj=[d | m] [&datumOd=datum] [&datumDo=datum] [&vrijemeOd=vrijeme] [&vrijemeDo=vrijeme]', get: 'nije implementirano', post: 'nije implementirano', put: 'nije implementirano', delete: 'nije implementirano' },
  ];

  roles = [
    { name: 'Gost', pages: 'Početna', description: 'Radi pretraživanje nakon unos 3 znaka. Ne postoji straničenje. Prikaz je u zadanom obliku.' },
    { name: 'Korisnik', pages: 'SerijaDetalji', description: 'Prikazuju se detalji serije. Nije moguće spremiti seriju u favorite.' },
    { name: 'Gost', pages: 'Dokumentacija', description: 'Implementirano.' },
    { name: 'Gost', pages: 'Prijava, Odjava', description: 'Implementirano u potpunosti.' },
    { name: 'Korisnik', pages: 'Profil', description: 'Implementirano.' },
    { name: 'Korisnik', pages: 'Favoriti', description: 'Nije implementirano.' },
    { name: 'Korisnik', pages: 'FavoritDetalji', description: 'Nije implementirano.' },
    { name: 'Admin', pages: 'Registracija', description: 'Implementirano u potpunosti. Samo admin može registrirati korisnike.' },
    { name: 'Admin', pages: 'Korisnici', description: 'Implementirano u potpunosti. Samo admin ima pristup svim korisnicima.' },
    { name: 'Admin', pages: 'Dnevnik', description: 'Nije implementirano.' },
  ];
}
