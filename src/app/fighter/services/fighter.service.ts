import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fighter } from '../models/fighter';

@Injectable({
  providedIn: 'root'
})
export class FighterService {



  constructor(private http: HttpClient) { }


  get(): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(environment.iutApiBaseUrl + "/fighters");
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.iutApiBaseUrl + "/fighters/" + id);
  }
  update(fighter: Fighter): Observable<string> {
    return this.http.put<string>(environment.iutApiBaseUrl + "/fighters/" + fighter.id, fighter);
  }

  create(fighter: Fighter): Observable<string> {
    return this.http.post<string>(environment.iutApiBaseUrl + "/fighters", fighter);
  }
  getById(id: number): Observable<Fighter> {
    return this.http.get<Fighter>(environment.iutApiBaseUrl + "/fighters/" + id);
  }

}
