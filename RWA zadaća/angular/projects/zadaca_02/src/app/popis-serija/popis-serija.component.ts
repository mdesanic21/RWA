import { Component, EventEmitter, Output } from '@angular/core';
import { SerijaI } from '../servisi/serijai';
import { SerijeService } from '../servisi/serije.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popis-serija',
  templateUrl: './popis-serija.component.html',
  styleUrls: ['./popis-serija.component.scss']
})
export class PopisSerijaComponent {
  serije = new Array<SerijaI>();
  oznaceniId?: Number;
  filter = '';

  constructor(private serijeServis: SerijeService, private router: Router) {
  }

  ngOnInit() {
    if (this.filter.length >= 3) {
      this.dohvatiPodatke();
    }
  }

  async dohvatiPodatke() {
    if (this.filter.length >= 3) {
      await this.serijeServis.osvjeziSerije(1, this.filter);
      this.serije = this.serijeServis.dajSerije();
    }
  }

  prikaziVise(id: Number){
    this.router.navigate(['/detalji', id]);
  }

  async filtriraj() {
    if (this.filter.length >= 3) {
      await this.dohvatiPodatke();
    }
  }
}
