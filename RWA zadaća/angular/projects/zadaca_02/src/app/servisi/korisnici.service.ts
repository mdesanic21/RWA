import { Injectable } from '@angular/core';
import { environment } from '../../environments/envrionment';
import { KorisniciI } from './korisnicii';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  trenutniKorisnik: KorisniciI | null = null;

  constructor() { }

  async dajKorisnike() {
    let korisnici = new Array<KorisniciI>();
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');
    const token = sessionStorage.getItem('token');
    if (token !== null) {
        zaglavlje.set('Authorization', token);
    }

    let parametri = {
        method: 'GET',
        headers: zaglavlje
    }

    let odgovor = await fetch(environment.restServis + '/korisnici', parametri);
    let data = await odgovor.json();

    korisnici = data.map((item: any) => {
        return {
            ime: item.Ime,
            prezime: item.Prezime,
            korime: item.Kor_ime,
            lozinka: item.Lozinka,
            email: item.Email,
        } as KorisniciI;
    });

    console.log(korisnici);
    return korisnici;
}


  async prijaviKorisnika(korime: String, lozinka: String, token: String){
    let tijelo = {
      korime: korime,
      lozinka: lozinka,
      token: token
    };

    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let parametri = {
      method: 'POST',
      body: JSON.stringify(tijelo),
      headers: zaglavlje
    }
    
    let odgovor = await fetch(environment.restServis + '/korisnici/'+ tijelo.korime + '/prijava', parametri);
    if (odgovor.status == 201) {
      let authorizationToken = odgovor.headers.get('Authorization');
      if (authorizationToken !== null) {
        sessionStorage.setItem('token', authorizationToken);
        console.log("Token", sessionStorage.getItem('token'));
      }
      let podaci = await (odgovor.json());                                                                                                                                    
      sessionStorage.setItem('korime', podaci.korisnik.Kor_ime);
      console.log(sessionStorage);

      return podaci;
    } else {
      return false;
    }
  }

  //github Login
  async gitHubLoginServisRedirect(): Promise<string> {
    try {
      const odgovor = await fetch(environment.gitHubServis +"Prijava");
      const url = await odgovor.text();
      return url;
    } catch (error) {
      throw error;
    }
  }

  async dajKorisnika(korime: String): Promise<KorisniciI | null> {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');
    const token = sessionStorage.getItem('token');
    if (token !== null) {
        zaglavlje.set('Authorization', token);
    }

    let parametri = {
        method: 'GET',
        headers: zaglavlje
    }

    let odgovor = await fetch(environment.restServis + '/korisnici/' + korime, parametri);

    if (odgovor.ok) {
        let data = await odgovor.json();
        const korisnik: KorisniciI = {
          ime: data.Ime as String,
          prezime: data.Prezime as String,
          korime: data.Kor_ime as String,
          lozinka: data.Lozinka as String,
          email: data.Email as String,
      };
      return korisnik;
    } else {
        return null;
    }
}
async obrisiKorisnika(korime: String) {
  let zaglavlje = new Headers();
  zaglavlje.set('Content-Type', 'application/json');
  const token = sessionStorage.getItem('token');
  if (token !== null) {
      zaglavlje.set('Authorization', token);
  }
  
  let parametri = {
      method: 'DELETE',
      headers: zaglavlje
  }
  if(korime == 'admin'){
    console.log("Ne možete izbrisati administratora.")
    return false;
  } else{
  let odgovor = await fetch(environment.restServis + '/korisnici/' + korime, parametri);
  if (odgovor.ok) {
    return true;
  } else {
    return false;
  }
  }
}
async azurirajKorisnika(korisnik: KorisniciI, recaptcha: String) {
  let zaglavlje = new Headers();
  zaglavlje.set('Content-Type', 'application/json');
  const token = sessionStorage.getItem('token');

  if (token !== null) {
      zaglavlje.set('Authorization', token);
  }
  let parametri = {
      method: 'PUT',
      headers: zaglavlje,
      body: JSON.stringify({
          ime: korisnik.ime,
          prezime: korisnik.prezime,
          email: korisnik.email,
          korime: korisnik.korime,
          token: recaptcha
      })
  };

  console.log("ispisi nesto");
  let odgovor = await fetch(environment.restServis + '/korisnici/' + korisnik.korime, parametri);

  if (odgovor.ok) {
      return true;
  } else {
      return false;
  }
}
  async registrirajKorisnika(korisnik: KorisniciI, recaptcha: String){
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      zaglavlje.set('Authorization', token);
    }

    let parametri = {
      method: 'POST',
      headers: zaglavlje,
      body: JSON.stringify({
          ime: korisnik.ime,
          prezime: korisnik.prezime,
          lozinka: korisnik.lozinka,
          email: korisnik.email,
          korime: korisnik.korime,
          token: recaptcha
    })
    };
    let odgovor = await fetch(environment.restServis + '/korisnici' , parametri);

    if (odgovor.ok) {
      return true;
    } else {
      return false;
    }
  }
}
