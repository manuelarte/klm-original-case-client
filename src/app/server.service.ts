import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../model/airport";
import {map} from "rxjs/operators";
import {Fare} from "../model/fare";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {}

  // I don't know how to make it work in the backend the rest endpoint with the term param
  search(term: string, page = 1): Observable<Airport[]> {
    return this.http.get<Airport[]>('http://localhost:9000/travel/users/airports')
      .pipe(
        map((response: any) => {
          let mapped = response._embedded.locations
            .map(airport => new Airport(airport.code, airport.name, airport.description))
            .filter(airport => airport.code.toUpperCase().includes(term))
          return mapped;
        })
      );
  }

  fare(origin: string, destination: string): Observable<Fare> {
    return this.http.get<Fare>(`http://localhost:9000/travel/users/fares/${origin}/${destination}`)
  }

  private _filter(text: string, data: Airport[]): Airport[] {
    console.log("Filtering ", text)
    return data.filter(it => it.code.toLowerCase().includes(text))
  }
}
