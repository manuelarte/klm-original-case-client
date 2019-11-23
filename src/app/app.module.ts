import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchCodeComponent } from './components/search-code/search-code.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServerService} from "./services/server.service";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule, MatCardModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatListModule,
  MatProgressBarModule, MatButtonModule, MatToolbarModule} from "@angular/material";
import { FareComponent } from './components/fare/fare.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FareDashboardComponent } from './components/fare-dashboard/fare-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCodeComponent,
    FareComponent,
    SidenavComponent,
    AdminDashboardComponent,
    FareDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
