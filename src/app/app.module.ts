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
  MatProgressBarModule,
  MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TramCountdownComponent } from './tram-countdown/tram-countdown.component';

import { StationService } from './services/station.service';
import { StopService } from './services/stop.service';
import { CountdownPipe } from './countdown.pipe';
import { DeptimePipe } from './deptime.pipe';

const appRoutes: Routes = [
  { path: '', component: TramCountdownComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    TramCountdownComponent,
    CountdownPipe,
    DeptimePipe
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
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StopService, StationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
