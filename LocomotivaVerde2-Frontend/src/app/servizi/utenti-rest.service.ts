import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utente } from '../model/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtentiRestService {

  private baseURL = 'http://localhost:8080/utenti';

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<any> {
    return this.http.get('http://localhost:8080/utenti/listautenti');
  }

  // tslint:disable-next-line: typedef
  postUtente(utente: Utente){
    return this.http.post('http://localhost:8080/utenti/listautenti', utente).subscribe(data => {
      console.log('Utente aggiunto al db!');
    });
  }

  getNomiUtenti(): Observable<any> {
    return this.http.get(`http://localhost:8080/utenti/listanomi`);
  }

  // tslint:disable-next-line: typedef
  getUtentePerNome(nome: string): Observable<any>{
    console.log(nome);
    return this.http.get(`${this.baseURL}/${nome}/cercautente`);
  }

  getEmailUtenti(): Observable<any> {
    return this.http.get(`http://localhost:8080/utenti/listaemail`);
  }

  // tslint:disable-next-line: typedef
  getUtentePerEmail(email: string): Observable<any>{
    console.log(email);
    return this.http.get(`${this.baseURL}/${email}/cercautenteemail`);
  }

  // tslint:disable-next-line: typedef
  deleteUtente(id: number){
    console.log(id);
    return this.http.post(`${this.baseURL}/${id}/elimina`, null);
  }

  // tslint:disable-next-line: typedef
  putUtente(utente: Utente) {
    return this.http.post(`${this.baseURL}/${utente.id}/aggiorna`, utente);
  }

}
