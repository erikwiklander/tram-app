import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule,
  NoConflictStyleCompatibilityMode,
  MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TramCountdownComponent } from './tram-countdown/tram-countdown.component';

import { DepartureService } from './services/departure.service';
import { StationService } from './services/station.service';
import { StopService } from './services/stop.service';
import { CountdownPipe } from './countdown.pipe';

const appRoutes: Routes = [
  { path: '', component: TramCountdownComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    TramCountdownComponent,
    CountdownPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    NoConflictStyleCompatibilityMode,
    FlexLayoutModule,
    MatProgressBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StopService, StationService, DepartureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
