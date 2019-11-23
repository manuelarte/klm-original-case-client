import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Airport} from "../../models/airport";
import {ServerService} from "../../services/server.service";
import {tap} from "rxjs/operators";
import {Fare} from "../../models/fare";

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent implements OnInit, OnChanges {

  @Input() origin: Airport;
  @Input() destination: Airport;

  isLoading = true;
  fare: Fare = null;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    if (this.origin != null && this.destination != null) {
      this.loadFare()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.origin != null && this.destination != null) {
      this.loadFare()
    }
  }

  private loadFare() {
    this.serverService.fare(this.origin.code, this.destination.code)
      .pipe(
        tap( () => this.isLoading = true)
      ).subscribe(data => {
      this.isLoading = false
      this.fare = data
    })
  }

}
