import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GestioneComponent } from './gestione/gestione.component';
import { TreniComponent } from './treni/treni.component';
import { UtentiComponent } from './utenti/utenti.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';
import { SelezionaDirective } from './direttive/seleziona.directive';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GestioneComponent,
    TreniComponent,
    UtentiComponent,
    PrenotazioniComponent,
    SelezionaDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
