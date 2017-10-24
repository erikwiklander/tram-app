import { Stop } from './../model/stop.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { StopService } from './../services/stop.service';
import { StationService } from './../services/station.service';
import { Subscription } from 'rxjs/Subscription';
import { CountdownDeparture } from '../model/countdown-departure.model';

@Component({
  selector: 'app-tram-countdown',
  templateUrl: './tram-countdown.component.html',
  styleUrls: ['./tram-countdown.component.css']
})
export class TramCountdownComponent implements OnInit, OnDestroy {

  constructor(private stopService: StopService, private stationService: StationService) {}

  stops: Stop[];
  selectedStopId: number;
  direction = 'solna';
  private selectedStopsubscription: Subscription;
  private depSubscription: Subscription;
  departures: CountdownDeparture[] = [];

  ngOnInit() {
    this.stops = this.stopService.getAllStops().reverse();
    this.selectedStopsubscription = this.stationService.selectedStop
      .subscribe((id: number) => {
        this.selectedStopId = id;
        if (id) {
          this.stationService.updateSelectedStation(id);
        }
      });

    this.depSubscription = this.stationService.getDepartureBehavior().subscribe(
      (deps: CountdownDeparture[]) => this.departures = deps
    );
  }

  public getMode() {

    if ((this.direction === 'solna' && this.selectedStopId === 740024929)
          || this.direction === 'sickla' && this.selectedStopId === 740024807) {
            return 'determinate';
    }

    if (!this.selectedStopId) {
      return 'indeterminate';
    } else if (this.departures.length === 0) {
      return 'query';
    } else {
      return 'determinate';
    }
  }

  public onClickChangeDirection(direction: string) {
    this.direction = direction;
    this.stationService.changeDirection(direction);
  }

  public onStopChange() {
    this.stationService.updateSelectedStation(this.selectedStopId);
  }

  public onClickGetLocation() {
    this.stationService.getLocation();
  }

  public onClickChangeVisible(num: number) {
    this.stationService.addNumberOfDeps(num);
  }

  ngOnDestroy() {
    this.selectedStopsubscription.unsubscribe();
    this.depSubscription.unsubscribe();
  }

}
