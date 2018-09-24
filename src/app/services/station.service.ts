import { ServerError } from './../model/server-error.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from './../../environments/environment';
import { CountdownDeparture } from './../model/countdown-departure.model';
import { Departure } from './../model/departure.model';
import { StopService } from './stop.service';

import 'rxjs/Rx';
import * as moment from 'moment-timezone';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StationService {

  constructor(private http: HttpClient, private stopService: StopService) {
    this.setInitialStation();
  }

  selectedStop = <BehaviorSubject<number>>new BehaviorSubject(null);
  departures = <BehaviorSubject<CountdownDeparture[]>>new BehaviorSubject([]);
  error = <BehaviorSubject<ServerError>>new BehaviorSubject(null);
  direction2 = <BehaviorSubject<string>>new BehaviorSubject('solna');
  currentStop: number;

  departuresTowardsSickla: Departure[] = [];
  departuresTowardsSolna: Departure[] = [];

  numberOfDeps = 2;

  getDepartureBehavior(): BehaviorSubject<CountdownDeparture[]> {
    return this.departures;
  }

  getErrorBehavior(): BehaviorSubject<ServerError> {
    return this.error;
  }

  getDirectionBehavior(): BehaviorSubject<string> {
    return this.direction2;
  }

  private setInitialStation() {

    this.getLocation();

    // update counter every second
    setInterval(() => this.updateDepartures(), 1000);

    // refresh data with back end every 30 minutes
    setInterval(() => this.updateBackend(this.currentStop),  30 * 60 * 1000);
  }

  changeDirection(direction: string) {
    console.log('Change direction', direction);
    this.numberOfDeps = 2;
    this.saveDirection(direction);
    this.direction2.next(this.getDirection());
    this.updateDepartures();
  }

  updateDepartures() {
    const now = new Date();
    const deps = this.getDirection() === 'solna' ? this.departuresTowardsSolna : this.departuresTowardsSickla;
    const countdown: (CountdownDeparture)[] = [];
    for (let i = 0; i < deps.length; i++) {
      const depDate = deps[i].rtDate ? deps[i].rtDate : deps[i].tableDate;
      const millis = depDate.getTime() - now.getTime();
      if (millis > -60000) {
        countdown.push(new CountdownDeparture(depDate, millis, deps[i].rtDate != null, deps[i].end, deps[i].current));
        if (countdown.length === this.numberOfDeps) {
          break;
        }
      }
    }
    this.departures.next(countdown);
  }

  getClosestStation(position: Position) {

    console.log('getClosestStation', position);

    let params = new HttpParams();
    params = params.append('la', '' + position.coords.latitude);
    params = params.append('lo', '' + position.coords.longitude);

    this.http.get<number>(environment.backend + '/closestId', {params: params} ).subscribe(data => {
      this.selectedStop.next(data);
    }, (errorResponse: HttpErrorResponse) => this.error.next(this.createError(errorResponse)));
  }

  updateSelectedStation(id: number) {
    this.error.next(null);
    if (id) {
      console.log('updateSelectedStation', id);
      this.currentStop = id;
      this.departuresTowardsSickla = [];
      this.departuresTowardsSolna = [];
      this.updateDepartures();
      this.updateBackend(id);
      this.direction2.next(this.getDirection());
    }
  }

  updateBackend(id: number) {
    this.getDepartures(id, 'sickla');
    this.getDepartures(id, 'solna');
  }

  private getDepartures(id: number, destination: string) {
    console.log('getDepartures', id, destination);
    let params = new HttpParams();
    params = params.append('id', '' + id).append('direction', destination);
    return this.http.get<any[]>(environment.backend + '/dep', {params: params})
      .map(deps => deps.map(dep =>
        new Departure(this.parseDate(dep['rtDepTime']), this.parseDate(dep['depTime']), dep['end'], dep['current'])))
      .subscribe(departures => {
        if (destination === 'sickla') {
          this.departuresTowardsSickla = departures;
        } else {
          this.departuresTowardsSolna = departures;
        }
        this.updateDepartures();
      }, (errorResponse: HttpErrorResponse) => this.error.next(this.createError(errorResponse)));
  }

  public addNumberOfDeps(num: number) {
    this.numberOfDeps = (this.numberOfDeps + num);
    this.updateDepartures();
  }

  public getLocation() {

    console.log('Getting position...');
    this.selectedStop.next(null);
    this.departuresTowardsSickla = [];
    this.departuresTowardsSolna = [];
    this.updateDepartures();
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('Position here', position);
        this.getClosestStation(position);
      },
      error => {
        console.log('Error: ', error);
        this.selectedStop.next(740021705);
      });
  }

  private parseDate(strDate: string): Date {
    return strDate ? moment.tz(strDate, moment.ISO_8601, 'Europe/Stockholm').toDate() : null;
  }

  private createError(errorResponse: HttpErrorResponse): ServerError {
    return new ServerError(errorResponse.error['status'], errorResponse.error['error'], errorResponse.error['message']);
  }

  private saveDirection(direction: string) {
    try {
      localStorage.setItem('' + this.currentStop, direction);
    } catch (error) {
      // ignore
    }
  }

  private getDirection(): string {
    try {
      const dir = localStorage.getItem('' + this.currentStop);
      if (dir) {
        return dir;
      } else {
        return 'solna';
      }
    } catch (error) {
      return 'solna';
    }
  }

}
