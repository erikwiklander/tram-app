import { Stop } from './../model/stop.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { StopService } from './../services/stop.service';
import { StationService } from './../services/station.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tram-countdown',
  templateUrl: './tram-countdown.component.html',
  styleUrls: ['./tram-countdown.component.css']
})
export class TramCountdownComponent implements OnInit, OnDestroy {

  constructor(private stopService: StopService, private stationService: StationService) {}

  stops: Stop[];
  selectedStopId: number;
  private subscription: Subscription;

  ngOnInit() {
    this.stops = this.stopService.getAllStops().reverse();
    this.subscription = this.stationService.selectedStop
      .subscribe((id: number) => this.selectedStopId = id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
