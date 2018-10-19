import { Stop } from './../model/stop.model';
import { Observable ,  Subscription ,  Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { StopService } from './../services/stop.service';
import { StationService } from './../services/station.service';
import { DisruptionService } from './../services/disruption.service';
import { CountdownDeparture } from '../model/countdown-departure.model';
import { Disruption } from '../model/disruption.model';
import { ServerError } from '../model/server-error.model';

@Component({
  selector: 'app-tram-countdown',
  templateUrl: './tram-countdown.component.html',
  styleUrls: ['./tram-countdown.component.css']
})
export class TramCountdownComponent implements OnInit, OnDestroy {

  constructor(private stopService: StopService, private stationService: StationService, private disruptionService: DisruptionService) {}

  stops: Stop[];
  selectedStopId: string;
  direction: string;
  private selectedStopsubscription: Subscription;
  private depSubscription: Subscription;
  private errorSubscription: Subscription;
  private directionSubsription: Subscription;
  private disruptionSubscrption: Subscription;
  departures: CountdownDeparture[] = [];
  disruptions: Disruption[] = [];
  error: ServerError;

  ngOnInit() {
    this.stops = this.stopService.getAllStops().reverse();
    this.selectedStopsubscription = this.stationService.selectedStop
      .subscribe((id: number) => {
        this.selectedStopId = '' + id;
        if (id) {
          this.stationService.updateSelectedStation(id);
        }
      });

    this.depSubscription = this.stationService.getDepartureBehavior().subscribe(
      (deps: CountdownDeparture[]) => this.departures = deps
    );

    this.errorSubscription = this.stationService.getErrorBehavior().subscribe(
      (error: ServerError) => this.error = error);

    this.directionSubsription = this.stationService.getDirectionBehavior().subscribe(
      (direction: string) => this.direction = direction);

    this.disruptionSubscrption = this.disruptionService.getDepartureBehavior().subscribe(
      (disruptions: Disruption[]) => this.disruptions = disruptions
    );

    this.disruptionService.updateDisruptions();
  }

  public getMode() {

    if (this.error || (this.direction === 'solna' && +this.selectedStopId === 740000759)
          || (this.direction === 'sickla' && +this.selectedStopId === 740024807)) {
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
    this.stationService.changeDirection(direction);
    this.disruptionService.updateDisruptions();
  }

  public onStopChange() {
    this.stationService.updateSelectedStation(+this.selectedStopId);
    this.disruptionService.updateDisruptions();
  }

  public onClickGetLocation() {
    this.stationService.getLocation();
    this.disruptionService.updateDisruptions();
  }

  public onClickChangeVisible(num: number) {
    this.stationService.addNumberOfDeps(num);
  }

  ngOnDestroy() {
    this.selectedStopsubscription.unsubscribe();
    this.depSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.directionSubsription.unsubscribe();
  }

}
