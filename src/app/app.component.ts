import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;
  title = 'original-case-client';

  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.events.subscribe(() => {
      this.sidenav.close();
    });
  }

}
