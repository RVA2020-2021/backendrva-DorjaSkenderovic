import { KREDIT_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kredit } from '../models/kredit';


@Injectable({
  providedIn: 'root'
})
export class KreditService {

  constructor(public httpClient: HttpClient) { }

  public getAllKrediti(): Observable<any> {
    return this.httpClient.get(`${KREDIT_URL}`);
  }

  public addKredit(kredit: Kredit): Observable<any> {
    kredit.id = 0;
    return this.httpClient.post(`${KREDIT_URL}`, kredit);
  }

  public updateKredit(kredit: Kredit): Observable<any> {
    return this.httpClient.put(`${KREDIT_URL}`, kredit);
  }

  public deleteKredit(id: number): Observable<any> {
    return this.httpClient.delete(`${KREDIT_URL}/${id}`);
  }

}