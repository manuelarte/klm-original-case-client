import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../models/airport";
import {map} from "rxjs/operators";
import {Fare} from "../models/fare";
import {Statistics} from "../models/statistics";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {}

  // I don't know how to make it work in the backend the rest endpoint with the term param
  search(term: string, page = 1): Observable<Airport[]> {
    return this.http.get<Airport[]>(environment.backendUrl + '/travel/users/airports')
      .pipe(
        map((response: any) => {
          let mapped = response._embedded.locations
            .filter(airport => airport.code.toUpperCase().includes(term))
          return mapped;
        })
      );
  }

  fare(origin: string, destination: string): Observable<Fare> {
    return this.http.get<Fare>(environment.backendUrl + `/travel/users/fares/${origin}/${destination}`)
  }

  statistics(): Observable<Statistics> {
    return this.http.get<Statistics>(environment.backendUrl + `/travel/admin/statistics`)
  }

}
