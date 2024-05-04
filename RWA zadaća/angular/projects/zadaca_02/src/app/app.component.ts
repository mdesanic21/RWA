import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/envrionment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zadaca_2';
  putanja = 'popis';
  korime: String = '';

  constructor(private router: Router){
    this.zapisiSesiju();
    this.korime = sessionStorage.getItem('korime') || '';
    if (!sessionStorage.getItem('korime')) {
      sessionStorage.setItem('korime', '');
    }
  }

  get isAdmin() {
    this.korime = sessionStorage.getItem('korime') || '';
    return sessionStorage.getItem('korime') === 'admin';
  }

  get isNotAdmin() {
    this.korime = sessionStorage.getItem('korime') || '';
    return sessionStorage.getItem('korime') != 'admin' && sessionStorage.getItem('korime') != '';
  }

  get isNotUser() {
    return sessionStorage.getItem('korime') === '';
  }

  async odjava() {
    sessionStorage.setItem('korime', '');
    sessionStorage.removeItem('token');
    await fetch(environment.restServis + "/odjava");
    this.router.navigate(['prijava']);
  }

  async zapisiSesiju(){
    let odgovor = (await fetch(environment.restServis + "/getSesija"));
    const korime = await odgovor.text();
    if(korime == '{}'){
      console.log("es tu");
      return ;
    }
    else{
      sessionStorage.setItem("korime", korime);
    }
  }
}
