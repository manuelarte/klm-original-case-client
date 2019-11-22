import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Airport} from "../../model/airport";
import {ServerService} from "../server.service";
import {tap} from "rxjs/operators";
import {Fare} from "../../model/fare";

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
      console.log("data", data)
      this.isLoading = false
      this.fare = data
    })
  }

  getSymbol(): string {
    let symbol;
    if (this.fare.currency == 'USD') {
      symbol = "euro"
    } else {
      symbol = "attach_money"
    }
    return symbol
  }

}
