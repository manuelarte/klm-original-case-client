import { Component, OnInit } from '@angular/core';
import {Airport} from "../../models/airport";

@Component({
  selector: 'app-fare-dashboard',
  templateUrl: './fare-dashboard.component.html',
  styleUrls: ['./fare-dashboard.component.scss']
})
export class FareDashboardComponent implements OnInit {

  origin: Airport
  destination: Airport

  constructor() { }

  ngOnInit() {
  }

  setOrigin(origin: Airport) {
    this.origin = origin
  }

  setDestination(destination: Airport) {
    this.destination = destination
  }

}
