import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treno } from '../model/treno.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreniRestService {

  private baseURL = 'http://localhost:8080/treni';

  constructor(private http: HttpClient) {}


  getTreni(): Observable<any> {
      return this.http.get('http://localhost:8080/treni/listatreni');
  }

  getTreniQuery(orig: string, dest: string): Observable<any> {
    return this.http.get(`http://localhost:8080/treni/query/${orig}/${dest}`);
  }

  getOrigini(): Observable<any> {
    return this.http.get('http://localhost:8080/treni/citta/origini');
  }

  getDestinazioni(): Observable<any> {
    return this.http.get('http://localhost:8080/treni/citta/destinazioni');
  }

  // tslint:disable-next-line: typedef
  postTreno(treno: Treno){
    return this.http.post('http://localhost:8080/treni/listatreni', treno).subscribe(data => {
      console.log('Dati aggiunti al server!');
    });
  }

  // tslint:disable-next-line: typedef
  deleteTreno(id: number){
    console.log(id);
    return this.http.post(`${this.baseURL}/${id}/elimina`, null);
  }

  // tslint:disable-next-line: typedef
  putTreno(treno: Treno) {
    return this.http.post(`${this.baseURL}/${treno.id}/aggiorna`, treno);
  }

  getCorseTreni(): Observable<any> {
    return this.http.get(`http://localhost:8080/treni/listacorse`);
  }

}
