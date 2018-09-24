import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressBarModule,
  MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TramCountdownComponent } from './tram-countdown/tram-countdown.component';

import { StationService } from './services/station.service';
import { StopService } from './services/stop.service';
import { DisruptionService } from './services/disruption.service';
import { CountdownPipe } from './countdown.pipe';
import { DeptimePipe } from './deptime.pipe';
import { DisruptionComponent } from './disruptions/disruption/disruption.component';
import { AboutComponent } from './about/about/about.component';

const appRoutes: Routes = [
  { path: '', component: TramCountdownComponent},
  { path: 'disruptions', component: DisruptionComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    TramCountdownComponent,
    CountdownPipe,
    DeptimePipe,
    DisruptionComponent,
    AboutComponent
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
    FlexLayoutModule,
    MatProgressBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StopService, StationService, DisruptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
