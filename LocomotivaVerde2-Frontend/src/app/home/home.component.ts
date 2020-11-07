import { Component, OnInit } from '@angular/core';

import { Treno } from '../model/treno.model';
import { Utente } from '../model/utente.model';
import { Prenotazione } from '../model/prenotazione.model';

import { UtentiRestService } from '../servizi/utenti-rest.service';
import { TreniRestService } from '../servizi/treni-rest.service';
import { PrenotazioniRestService } from '../servizi/prenotazioni-rest.service';
import { UtentiComponent } from '../utenti/utenti.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaTreni: Treno[];
  origineSelezionata: string;
  destinazioneSelezionata: string;

  listaOrigini: any[];
  listaDestinazioni: any[];

  listaUtenti: any[];
  listaPrenotazioni: any[];

  compratore: number;

  utente: Utente;

  listaNomiUtenti: any[];
  listaEmailUtenti: any[];
  idUtenteSelezionato: number;
  nomeUtenteSelezionato: string;
  cognomeUtenteSelezionato: string;
  emailUtenteSelezionato: string;

  abilitaLogin = false;
  visibileLogin = false;
  selezioneOn = true;
  selezionatoUtente = false;
  loggato = false;
  riloggato = false;

  statoLogin: string;

  /*constructor(private treniService: TreniService) { }

  ngOnInit(): void {
    this.listaTreni = this.treniService.getTreni();
  }*/

  // tslint:disable-next-line: max-line-length
  constructor(private treniRestService: TreniRestService, private utentiRestService: UtentiRestService, private prenotazioniRestservice: PrenotazioniRestService) { }

  ngOnInit(): void {
    /*this.treniRestService.getTreni().subscribe(data => {
      this.listaTreni = data;
    });*/
    this.treniRestService.getOrigini().subscribe(data => {
      this.listaOrigini = data;
    });

    this.treniRestService.getDestinazioni().subscribe(data => {
      this.listaDestinazioni = data;
    });

    this.prenotazioniRestservice.getPrenotazioni().subscribe(data => {
      this.listaPrenotazioni = data;
    });

    this.utentiRestService.getUtenti().subscribe(data => {
      this.listaUtenti = data;
    });

    this.utentiRestService.getNomiUtenti().subscribe(data => {
      this.listaNomiUtenti = data;
    });

    this.utentiRestService.getEmailUtenti().subscribe(data => {
      this.listaEmailUtenti = data;
    });
  }


  /*#################################################### INIZIO METODI #############################################*/

  /*#################################################### TRENI #############################################*/
  query(): void{
    const orig = this.origineSelezionata;
    const dest = this.destinazioneSelezionata;

    /*this.treniRestService.getTreni().subscribe(data => {
      this.listaTreni = data;
    });*/
    this.treniRestService.getTreniQuery(orig, dest).subscribe(data => {
      this.listaTreni = data;
    });
  }

  /*#################################################### PRENOTAZIONI #############################################*/
  // tslint:disable-next-line: typedef
  aggiungiPrenotazione(trenoPassato: Treno){
    if (trenoPassato.postidisponibili === 0){
      window.alert('Posti disponibili esauriti, scegliere un altro treno. Grazie!');
    }else if (!this.selezionatoUtente){
      window.alert('Nessun utente selezionato!');
    }else if (!this.loggato){
      window.alert('Devi selezionare un utente e fare il login!');
    }else{
      const prenotazione: Prenotazione = {
        compratore: this.idUtenteSelezionato,
        email: this.emailUtenteSelezionato,
        treno: trenoPassato.id,
        corsa: trenoPassato.corsa
      };
      console.log(this.compratore);
      console.log(this.emailUtenteSelezionato);
      console.log(trenoPassato.id);
      console.log(trenoPassato.corsa);
      console.log(prenotazione);
      if (window.confirm('Confermare prenotazione corsa ' + trenoPassato.corsa + ' ?')){
        this.prenotazioniRestservice.postPrenotazione(prenotazione);
        window.alert('Corsa ' + trenoPassato.corsa + ' prenotata.  BUON VIAGGIO!');
        this.refreshPrenotazioni();
        this.query();
      }else{
        window.alert('ATTENZIONE! Corsa ' + trenoPassato.corsa + ' non prenotata!');
      }
      /*this.refreshPrenotazioni();*/
    }
  }

  // tslint:disable-next-line: typedef
  refreshPrenotazioni(){
    this.prenotazioniRestservice.getPrenotazioni().subscribe(data => {
      this.listaPrenotazioni = data;
    });
  }

  /*####################################################UTENTE#############################################*/
  // tslint:disable-next-line: typedef
  /*cercaUtentePerNome(nome: string){
    this.utentiRestService.getUtentePerNome(nome).subscribe(data => {
      this.utente = data;
    });
    console.log(this.utente);
    this.idUtenteSelezionato = this.utente.id;
    this.cognomeUtenteSelezionato = this.utente.cognome;
    this.emailUtenteSelezionato =  this.utente.email;
    if (window.confirm('ID: ' + this.idUtenteSelezionato + '  NOME: ' + this.nomeUtenteSelezionato +
    ' COGNOME: ' + this.cognomeUtenteSelezionato + '  EMAIL: ' + this.emailUtenteSelezionato)){
        this.compratore = this.idUtenteSelezionato;
        window.alert('Login eseguito!');
        this.statoLogin = 'Login eseguito! Prenota il treno che desideri, "Locomotiva Verde 2" ti augura buon viaggio!';
    }else{
      window.alert('Devi selezionare un utente per effettuare una prenotazione!');
      this.statoLogin = 'Login non eseguito! Non puoi effettuare prenotazioni! Esegui il login, grazie!';
    }
  }*/

  // tslint:disable-next-line: typedef
  cercaUtentePerEmail(email: string){
    this.utentiRestService.getUtentePerEmail(email).subscribe(data => {
      this.utente = data;
      console.log(this.utente);
    });
    if (this.emailUtenteSelezionato === undefined){
      window.alert('Nessun utente selezionato!');
    }else{
      this.abilitaLogin = true;
      this.visibileLogin = true;
      this.selezionatoUtente = true;
      this.selezioneOn = false;
    }
  }

  // tslint:disable-next-line: typedef
  login(email: string){
    this.utentiRestService.getUtentePerEmail(email).subscribe(data => {
      this.utente = data;
      console.log(this.utente);
    });
    this.abilitaLogin = false;
    this.selezionatoUtente = true;
    this.riloggato = true;
    this.idUtenteSelezionato = this.utente.id;
    this.nomeUtenteSelezionato = this.utente.nome;
    this.cognomeUtenteSelezionato = this.utente.cognome;
    this.emailUtenteSelezionato =  this.utente.email;
    if (window.confirm('VERIFICA I DATI PRIMA DI PROCEDERE:\nID: ' + this.idUtenteSelezionato + '\nNOME: ' + this.nomeUtenteSelezionato +
    '\nCOGNOME: ' + this.cognomeUtenteSelezionato + '\nEMAIL: ' + this.emailUtenteSelezionato)){
        this.compratore = this.idUtenteSelezionato;
        window.alert('Login eseguito!');
        this.statoLogin = 'Benvenuto ' + this.nomeUtenteSelezionato + ' ' + this.cognomeUtenteSelezionato + ' '
        + 'prenota il treno che desideri, "Locomotiva Verde 2" ti augura buon viaggio!';
        this.loggato = true;
    }else{
      window.alert('Devi selezionare un utente per effettuare una prenotazione ed eseguire il login!');
      this.statoLogin = 'Login non eseguito! Non puoi effettuare prenotazioni se non selezioni un utente ed esegui il login!';
      this.loggato = false;
      this.selezioneOn = true;
    }
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.emailUtenteSelezionato = undefined;
    this.loggato = false;
    this .selezionatoUtente = false;
    this.abilitaLogin = false;
    this.visibileLogin = false;
    this.riloggato = false;
    this.selezioneOn = true;
  }

  /*#################################################### FINE METODI #############################################*/
}
