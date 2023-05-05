import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation } from '../models/organisation';
@Injectable({
  providedIn: 'root'
})
export class OrganisationService {



  constructor(private http: HttpClient) { }

  get(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(environment.iutApiBaseUrl + "/organisations");
  }
  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.iutApiBaseUrl + "/organisations/" + id);
  }
  update(organisation: Organisation): Observable<string> {
    return this.http.put<string>(environment.iutApiBaseUrl + "/organisations/" + organisation.id, organisation);
  }
  create(organisation: Organisation): Observable<string> {
    return this.http.post<string>(environment.iutApiBaseUrl + "/organisations", organisation);
  }
  getById(id: number): Observable<Organisation> {
    return this.http.get<Organisation>(environment.iutApiBaseUrl + "/organisations/" + id);
  }

}
