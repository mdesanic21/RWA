import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerijeService } from '../servisi/serije.service';
import { SerijaTMDBI } from '../servisi/serijeTMDBI';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-detalji-serije',
  templateUrl: './detalji-serije.component.html',
  styleUrls: ['./detalji-serije.component.scss']
})
export class DetaljiSerijeComponent implements OnInit {
  serija: SerijaTMDBI | null = null;

  constructor(private activatedRoute: ActivatedRoute, private serijeServis: SerijeService) {
    this.osvjeziPodatke();
  }

  ngOnInit(): void {
    this.osvjeziPodatke();
  }

  private async osvjeziPodatke(): Promise<void> {
    const idString = this.activatedRoute.snapshot.paramMap.get('id');
    const id: number = Number(idString);

    try {
      this.serija = await this.serijeServis.dajSeriju(id);

      if (this.serija) {
        this.serija.backdrop_path = environment.posteriPutanja + this.serija.backdrop_path;
        this.serija.poster_path = environment.posteriPutanja + this.serija.poster_path;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
