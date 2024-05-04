import { bootstrapApplication } from '@angular/platform-browser';
import { AppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppConfig)
  .catch((err) => console.error(err));

  if(environment.production){
    enableProdMode();
  }