import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../model/prenotazione.model';
import { PrenotazioniRestService } from '../servizi/prenotazioni-rest.service';
import { TreniRestService } from '../servizi/treni-rest.service';
import { UtentiRestService } from '../servizi/utenti-rest.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit {

  listaPrenotazioni: any[];

  listaEmailUtenti: any[];
  listaCorseTreni: any[];

  listaPrenotazioniPerEmailUtente: any[];
  listaPrenotazioniPerCorsaTreno: any[];

  emailUtenteSelezionato: string;
  trenoSelezionato: number;

  bloccaListaStorico = false;
  mostraListaPrenotazioni = false;

  attivoPrenotazioniPerEmail = false;
  attivoPrenotazioniPerCorsa = false;

  selezionataEmailUtente = false;
  mostraListaPrenotazioniPerEmailUtente = false;

  selezionataCorsaTreno = false;
  mostraListaPrenotazioniPerCorsaTreno = false;

  constructor(private prenotazioniRestService: PrenotazioniRestService,
    // tslint:disable-next-line: align
    private utentiRestService: UtentiRestService,
    // tslint:disable-next-line: align
    private treniRestService: TreniRestService) { }



  ngOnInit(): void {
    this.prenotazioniRestService.getPrenotazioni().subscribe(data => {
      this.listaPrenotazioni = data;
    });

    this.utentiRestService.getEmailUtenti().subscribe(data => {
      this.listaEmailUtenti = data;
    });

    this.treniRestService.getCorseTreni().subscribe(data => {
      this.listaCorseTreni = data;
    });
  }

  /*#################################################### INIZIO METODI #############################################*/

  /*#################################################### TABELLA STORICO #############################################*/

  // tslint:disable-next-line: typedef
  refreshPrenotazioni(){
    this.prenotazioniRestService.getPrenotazioni().subscribe(data => {
      this.listaPrenotazioni = data;
    });
  }

  // tslint:disable-next-line: typedef
  nascondiLista(){
    this.mostraListaPrenotazioni = false;
    this.refreshPrenotazioni();
  }
  // tslint:disable-next-line: typedef
  mostraLista(){
    this.mostraListaPrenotazioni = true;
    this.attivoPrenotazioniPerEmail = false;
    this.attivoPrenotazioniPerCorsa = false;
    this.refreshPrenotazioni();
  }

  // tslint:disable-next-line: typedef
  eliminaPrenotazione(prenotazione: Prenotazione){
    console.log(prenotazione.id);
    if (window.confirm('Sei sicuro di voler eliminare questa prenotazione?')){
      this.prenotazioniRestService.deletePrenotazione(prenotazione.id).subscribe(data => {
      console.log('Dati rimossi al server!');
      });
      window.alert('Prenotazione ' + prenotazione.id + ' eliminata con successo!');
      this.ngOnInit();
    }else{
      window.alert('Nessuna corsa è stata eliminata');
    }
    if (!this.bloccaListaStorico){
      this.mostraListaPrenotazioni = true;
    }else{
      if (this.attivoPrenotazioniPerEmail){this.cercaPrenotazioniPerEmailUtente(); }
      if (this.attivoPrenotazioniPerCorsa){this.cercaPrenotazioniCorsaTreno(); }
    }
  }

  /*#################################################### PRENOTAZIONI EMAIL #############################################*/

  selezionaEmailUtente(): void{
    this.attivoPrenotazioniPerCorsa = false;
    this.attivoPrenotazioniPerEmail = true;
    this.mostraListaPrenotazioni = false;
    this.bloccaListaStorico = true;
    this.selezionataEmailUtente = true;
    this.mostraListaPrenotazioniPerEmailUtente = false;
    const email = this.emailUtenteSelezionato;
    this.prenotazioniRestService.getPrenotazioniPerEmail(email).subscribe(data => {
      this.listaPrenotazioniPerEmailUtente = data;
    });
  }

  cercaPrenotazioniPerEmailUtente(): void{
    this.mostraListaPrenotazioniPerEmailUtente = true;
    this.selezionataEmailUtente = false;
    const email = this.emailUtenteSelezionato;
    console.log(email);
    this.prenotazioniRestService.getPrenotazioniPerEmail(email).subscribe(data => {
      this.listaPrenotazioniPerEmailUtente = data;
    });
    if (this.listaPrenotazioniPerEmailUtente.length === 0){
      // tslint:disable-next-line: quotemark
      window.alert("Non ci sono prenotazioni eseguite dall'utente " + this.emailUtenteSelezionato + '!');
    }
  }

  /*#################################################### PRENOTAZIONI CORSE #############################################*/

  selezionaCorsaTreno(): void{
    this.attivoPrenotazioniPerEmail = false;
    this.attivoPrenotazioniPerCorsa = true;
    this. mostraListaPrenotazioni = false;
    this.bloccaListaStorico = true;
    this.selezionataCorsaTreno = true;
    this.mostraListaPrenotazioniPerCorsaTreno = false;
    const treno = this.trenoSelezionato;
    console.log(this.trenoSelezionato);
    this.prenotazioniRestService.getPrenotazioniPerCorsaTreno(treno).subscribe(data => {
      this.listaPrenotazioniPerCorsaTreno = data;
    });
  }

  cercaPrenotazioniCorsaTreno(): void{
    this.mostraListaPrenotazioniPerCorsaTreno = true;
    this.selezionataCorsaTreno = false;
    const treno = this.trenoSelezionato;
    console.log(this.trenoSelezionato);
    this.prenotazioniRestService.getPrenotazioniPerCorsaTreno(treno).subscribe(data => {
      this.listaPrenotazioniPerCorsaTreno = data;
    });
    if (this.listaPrenotazioniPerCorsaTreno.length === 0){
      window.alert('Non ci sono prenotazioni per la corsa ' + this.trenoSelezionato + '!');
    }
  }

  /*#################################################### FINE METODI #############################################*/
}
