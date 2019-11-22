import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {tap} from "rxjs/operators";
import {Statistics} from "../../model/statistics";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  private isLoading = true
  private statistics: Statistics

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.statistics()
      .pipe(
        tap( () => this.isLoading = true)
      ).subscribe(data => {
      this.isLoading = false
      this.statistics = data
    },
      error => {
        this.isLoading = false
      })
  }

}
