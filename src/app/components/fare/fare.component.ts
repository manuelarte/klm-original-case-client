import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Airport} from "../../models/airport";
import {ServerService} from "../../services/server.service";
import {takeUntil, tap} from "rxjs/operators";
import {Fare} from "../../models/fare";
import {Subject} from "rxjs";

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent implements OnInit, OnChanges, OnDestroy {

  @Input() origin: Airport;
  @Input() destination: Airport;

  isLoading = true;
  fare: Fare = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private loadFare() {
    this.isLoading = true;
    this.serverService.fare(this.origin.code, this.destination.code)
      .pipe(
        tap( () => (this.isLoading = false)),
        takeUntil(this.destroy$))
      .subscribe(data => {
      this.fare = data
    })
  }

}
