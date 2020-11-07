import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestioneComponent } from './gestione/gestione.component';
import { HomeComponent } from './home/home.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';
import { TreniComponent } from './treni/treni.component';
import { UtentiComponent } from './utenti/utenti.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'gestione', component: GestioneComponent, children: [
    {path: 'treni', component: TreniComponent},
    {path: 'utenti', component: UtentiComponent},
    {path: 'prenotazioni', component: PrenotazioniComponent},
  ]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
