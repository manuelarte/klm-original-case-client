import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {takeUntil, tap} from "rxjs/operators";
import {Statistics} from "../../models/statistics";
import {Subject} from "rxjs";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  isLoading = true;
  statistics: Statistics;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.isLoading = true;
    this.serverService.statistics()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$))
      .subscribe(data => {
        this.statistics = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
