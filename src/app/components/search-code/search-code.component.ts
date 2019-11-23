import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, finalize, map, startWith, switchMap, tap} from "rxjs/operators";
import {Airport} from "../../models/airport";
import {ServerService} from "../../services/server.service";
import {pipe} from "rxjs";

@Component({
  selector: 'app-search-code',
  templateUrl: './search-code.component.html',
  styleUrls: ['./search-code.component.scss']
})
export class SearchCodeComponent implements OnInit {

  @Output() airportSelected = new EventEmitter<Airport>();

  searchAirportsCtrl = new FormControl();
  filteredAirports: Airport[];
  isLoading = false;
  errorMsg: string;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.search("", 0)
      .subscribe(data => {
          this.errorMsg = "";
          this.filteredAirports = data;
        });

    this.searchAirportsCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredAirports = [];
          this.isLoading = true;
        }),
        switchMap(value => this.serverService.search(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = "Error loading";
          this.filteredAirports = [];
        } else {
          this.errorMsg = "";
          this.filteredAirports = data;
        }
      });
  }

  onOptionSelected() {
    this.airportSelected.emit(this.searchAirportsCtrl.value)
  }

  onTextRemoved() {
    this.searchAirportsCtrl.setValue("")
    this.airportSelected.emit(null)
  }

  displayFn(value: Airport) {
    // I want to get the full object and display the name
    if (value != null) {
      return value.code
    }
    return "";
  }

}
