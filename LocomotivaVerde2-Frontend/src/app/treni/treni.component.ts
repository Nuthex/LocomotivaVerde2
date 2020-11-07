import { Component, OnInit } from '@angular/core';
import { Treno } from '../model/treno.model';
import { TreniRestService } from '../servizi/treni-rest.service';

@Component({
  selector: 'app-treni',
  templateUrl: './treni.component.html',
  styleUrls: ['./treni.component.scss']
})
export class TreniComponent implements OnInit {

  listaTreni: any[];

  origine: string;
  destinazione: string;
  corsa: number;
  partenza: Date;
  arrivo: Date;
  diretto: boolean;
  postidisponibili: number;

  constructor( private treniRestService: TreniRestService) { }

  ngOnInit(): void {
    this.treniRestService.getTreni().subscribe(data => {
      this.listaTreni = data;
    });
  }

  /*#################################################### INIZIO METODI #############################################*/

  // tslint:disable-next-line: typedef
  toggleDiretto(){
    this.diretto = !this.diretto;
  }

  // tslint:disable-next-line: typedef
  creaTreno(){
    const treno: Treno = {
      origine: this.origine,
      destinazione: this.destinazione,
      corsa: this.corsa,
      partenza: this.partenza,
      arrivo: this.arrivo,
      diretto: this.diretto,
      postidisponibili: this.postidisponibili
    };

    if (window.confirm('CREARE TRENO: ' +
      '\nOrigine: ' + this.origine +
      '\nDestinazione: ' + this.destinazione +
      '\nCorsa: ' + this.corsa +
      '\nPartenza: ' + this.partenza +
      '\nArrivo: ' + this.arrivo +
      '\nDiretto: ' + this.diretto +
      '\nPosti Disponibili: ' + this.postidisponibili + ' ?' +
      '\nOK PER CONFERMARE.. '
      )){
      this.treniRestService.postTreno(treno);
      window.alert('Treno ' + treno.corsa + ' creato correttamente!');
    }else{
      window.alert('Nessun treno creato!');
    }
    this.refreshTreni();
  }

  // tslint:disable-next-line: typedef
  aggiornaTreno(treno: Treno){
    if (window.confirm('Aggiornare treno ' + treno.corsa + ' ?')){
      this.treniRestService.putTreno(treno).subscribe(data => {
        console.log('Data is', data);
      });
      window.alert('Treno ' + treno.corsa + ' aggiornato correttamente!');
    }else{
      window.alert('Nessun treno aggiornato!');
    }
    this.refreshTreni();
  }

  // tslint:disable-next-line: typedef
  eliminaTreno(treno: Treno){
    console.log(treno.id);
    if (window.confirm('Sei sicuro di voler eliminare questo treno?')){
      this.treniRestService.deleteTreno(treno.id).subscribe(data => {
        console.log('Dati rimossi al server!');
      });
      window.alert('Treno ' + treno.corsa + ' eliminato correttamente!');
    }else{
      window.alert('Nessun treno eliminato!');
    }
    this.refreshTreni();
  }

  // tslint:disable-next-line: typedef
  refreshTreni(){
    this.ngOnInit();
    this.treniRestService.getTreni().subscribe(data => {
      this.listaTreni = data;
    });
  }

  /*#################################################### FINE METODI #############################################*/
}
