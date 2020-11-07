import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente.model';
import { UtentiRestService } from '../servizi/utenti-rest.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {


  listaUtenti: any[];
  listaNomiUtenti: any[];

  nome: string;
  cognome: string;
  email: string;

  constructor( private utentiRestService: UtentiRestService) { }

  ngOnInit(): void {
    this.utentiRestService.getUtenti().subscribe(data => {
      this.listaUtenti = data;
    });
    this.utentiRestService.getNomiUtenti().subscribe(data => {
      this.listaNomiUtenti = data;
    });
  }

  /*#################################################### INIZIO METODI #############################################*/

  // tslint:disable-next-line: typedef
  creaUtente(){
    const utente: Utente = {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
    };

    if (window.confirm('CREARE UTENTE: ' +
      '\nNome: ' + this.nome +
      '\nCognome: ' + this.cognome +
      '\nEmail: ' + this.email + ' ?' +
      '\nOK PER CONFERMARE.. '
      )){
      this.utentiRestService.postUtente(utente);
      window.alert('Utente ' + this.nome + ' creato correttamente!');
    }else{
      window.alert('Nessun utente creato!');
    }
    console.log(this.nome);
    console.log(this.cognome);
    console.log(this.email);
    console.log(utente);
    this.refreshUtenti();
  }

  // tslint:disable-next-line: typedef
  refreshUtenti(){
    this.utentiRestService.getUtenti().subscribe(data => {
      this.listaUtenti = data;
    });
  }

  // tslint:disable-next-line: typedef
  aggiornaUtente(utente: Utente){
    if (window.confirm('Aggiornare utente ' + utente.id + ' ?')){
      this.utentiRestService.putUtente(utente).subscribe(data => {
        console.log('Data is', data);
      });
      window.alert('Utente ' + utente.id + ' aggiornato correttamente!');
    }else{
      window.alert('Nessun utente aggiornato!');
    }
    this.refreshUtenti();
  }

  // tslint:disable-next-line: typedef
  eliminaUtente(utente: Utente){
    console.log(utente.id);
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')){
      this.utentiRestService.deleteUtente(utente.id).subscribe(data => {
        console.log('Dati rimossi al server!');
      });
      window.alert('Utente ' + utente.id + ' eliminato correttamente!');
    }else{
      window.alert('Nessun utente eliminato!');
    }
    this.refreshUtenti();
  }

  /*#################################################### FINE METODI #############################################*/
}
