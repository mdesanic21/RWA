import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PopisSerijaComponent } from './popis-serija/popis-serija.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DetaljiSerijeComponent } from './detalji-serije/detalji-serije.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { AuthGuard } from './servisi/auth.guard';
import { MojProfilComponent } from './moj-profil/moj-profil.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';

const routes: Routes = [
  { path: '', component: PopisSerijaComponent, canActivate: [AuthGuard], data: { user: true, admin: true } },
  { path: 'detalji/:id', component: DetaljiSerijeComponent, canActivate: [AuthGuard], data: { user: true, admin: true }},
  { path: 'prijava', component: PrijavaComponent},
  { path: 'korisnici', component: KorisniciComponent, canActivate: [AuthGuard], data: { user: false, admin: true }},
  { path: 'profil', component: MojProfilComponent, canActivate: [AuthGuard], data: { user: true, admin: true }},
  { path: 'profil/:korime', component: AzurirajKorisnikaComponent, canActivate: [AuthGuard], data: { user: true, admin: true }},
  { path: 'registracija', component: RegistracijaComponent, canActivate: [AuthGuard], data: { user: false, admin: true } },
  { path: 'dokumentacija', component: DokumentacijaComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes), FormsModule],
    exports: [RouterModule]
})
export class AppRoutes {}