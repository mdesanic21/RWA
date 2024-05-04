import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { PopisSerijaComponent } from './popis-serija/popis-serija.component';
import { DetaljiSerijeComponent } from './detalji-serije/detalji-serije.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { AuthGuard } from './servisi/auth.guard';
import { MojProfilComponent } from './moj-profil/moj-profil.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../environments/envrionment';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
@NgModule({
  declarations: [
    AppComponent,
    PopisSerijaComponent,
    DetaljiSerijeComponent,
    PrijavaComponent,
    KorisniciComponent,
    MojProfilComponent,
    AzurirajKorisnikaComponent,
    RegistracijaComponent,
    DokumentacijaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutes,
    RecaptchaV3Module,
    ReactiveFormsModule
  ],
  providers: [
              AuthGuard,
            {
              provide: RECAPTCHA_V3_SITE_KEY,
              useValue: environment.recaptchaSiteKey
            }],
  bootstrap: [AppComponent]
})
export class AppConfig { }
