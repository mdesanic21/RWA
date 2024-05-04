import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { SerijaTMDBI, SerijeTMDBI } from './serijeTMDBI';
import { SerijaI } from './serijai';

@Injectable({
  providedIn: 'root',
})
export class SerijeService {
  serijeTMDB?: SerijeTMDBI;
  serije = new Array<SerijaI>();

  constructor() { 
    let serije = localStorage.getItem('serije');
    if (serije == null) {
      this.osvjeziSerije(1, 'matrix');
    } else {
      this.serijeTMDB = JSON.parse(serije);
      this.serije = this.mapSerije(this.serijeTMDB?.results ?? []);
    }
  }

  async osvjeziSerije(stranica: number, kljucnaRijec: string) {
    let parametri = `?stranica=${stranica}&kljucnaRijec=${kljucnaRijec}`;
    let o = (await fetch(environment.restServis + "/tmdb/serije" + parametri)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text()) as SerijeTMDBI;
      console.log(r);
  
      this.serije = this.mapSerije(r.results);
      localStorage.setItem('serije', JSON.stringify(r));
    }
  }

  async dajSeriju(id: number): Promise<SerijaTMDBI | null> {
    const url = `${environment.restServis}/tmdb/serije/${id}`;
    console.log('Requesting:', url);
  
    try {
      const odgovor = await fetch(url);
  
      if (!odgovor.ok) {
        console.error(`Error fetching serija. Status: ${odgovor.status}`);
        throw new Error(`Error fetching serija. Status: ${odgovor.status}`);
      }
  
      const serija = await odgovor.json() as SerijaTMDBI;
      return serija;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  private mapSerije(serijeTMDB: SerijaTMDBI[] = []): SerijaI[] {
    return serijeTMDB.map(serijaTMDB => ({
      id: serijaTMDB.id,
      naziv: serijaTMDB.name,
      opis: serijaTMDB.overview,
      posterPath: environment.posteriPutanja + serijaTMDB.poster_path
    }));
  }

  dajSerije(): Array<SerijaI> {
    if (this.serije.length === 0) {
      return new Array<SerijaI>();
    } else {
      return this.serije;
    }
  }
}
