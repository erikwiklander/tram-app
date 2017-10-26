import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from './../../environments/environment';
import { CountdownDeparture } from './../model/countdown-departure.model';
import { Departure } from './../model/departure.model';
import { StopService } from './stop.service';

import 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class StationService {

  constructor(private http: HttpClient, private stopService: StopService) {
    this.setInitialStation();
  }

  selectedStop = <BehaviorSubject<number>>new BehaviorSubject(null);
  departures = <BehaviorSubject<CountdownDeparture[]>>new BehaviorSubject([]);

  departuresTowardsSickla: Departure[] = [];
  departuresTowardsSolna: Departure[] = [];

  direction = 'solna';
  numberOfDeps = 2;

  getDepartureBehavior(): BehaviorSubject<CountdownDeparture[]> {
    return this.departures;
  }

  private setInitialStation() {
    setInterval(() => this.updateDepartures(), 1000);
    this.getLocation();
  }

  changeDirection(direction: string) {
    console.log('Change direction', direction);
    this.direction = direction;
    this.numberOfDeps = 2;
    this.updateDepartures();
  }

  updateDepartures() {
    const now = new Date();
    const deps = this.direction === 'solna' ? this.departuresTowardsSolna : this.departuresTowardsSickla;
    const countdown: (CountdownDeparture)[] = [];
    for (let i = 0; i < deps.length; i++) {
      const depDate = deps[i].rtDate ? deps[i].rtDate : deps[i].tableDate;
      const millis = depDate.getTime() - now.getTime();
      if (millis > -45000) {
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
    });
  }

  updateSelectedStation(id: number) {
    console.log('updateSelectedStation', id);
    this.departuresTowardsSickla = [];
    this.departuresTowardsSolna = [];
    this.updateDepartures();
    this.getDepartures(id, 'sickla');
    this.getDepartures(id, 'solna');
  }

  private getDepartures(id: number, destination: string) {
    console.log('getDepartures', id, destination);
    let params = new HttpParams();
    params = params.append('id', '' + id);
    return this.http.get<any[]>(environment.backend + '/' + destination, {params: params})
      .map(deps => deps.map(dep =>
        new Departure(this.parseDate(dep['rtDepTime']), this.parseDate(dep['depTime']), dep['end'], dep['current'])))
      .subscribe(departures => {
        if (destination === 'sickla') {
          this.departuresTowardsSickla = departures;
        } else {
          this.departuresTowardsSolna = departures;
        }
        this.updateDepartures();
      });
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
    return strDate ? moment(strDate, moment.ISO_8601).toDate() : null;
  }

}
