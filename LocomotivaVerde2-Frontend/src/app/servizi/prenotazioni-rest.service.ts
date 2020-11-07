import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Prenotazione } from '../model/prenotazione.model';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniRestService {

  private baseURL = 'http://localhost:8080/prenotazioni';

  constructor(private http: HttpClient) {}

  getPrenotazioni(): Observable<any> {
    return this.http.get('http://localhost:8080/prenotazioni/listaprenotazioni');
  }

  // tslint:disable-next-line: typedef
  postPrenotazione(prenotazione: Prenotazione){
    return this.http.post('http://localhost:8080/prenotazioni/listaprenotazioni', prenotazione).subscribe(data => {
      console.log('Prenotazione aggiunta al db!');
    });
  }

  // tslint:disable-next-line: typedef
  deletePrenotazione(id: number){
    console.log(id);
    return this.http.post(`${this.baseURL}/${id}/elimina`, null);
  }

  getPrenotazioniPerEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:8080/prenotazioni/query/${email}/emailutente`);
  }

  getPrenotazioniPerCorsaTreno(corsa: number): Observable<any> {
    return this.http.get(`http://localhost:8080/prenotazioni/query/${corsa}/trenocorsa`);
  }
}
