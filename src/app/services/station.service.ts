import { StopService } from './stop.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Stop } from './../model/stop.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class StationService {

  constructor(private http: HttpClient, private stopService: StopService) { 
    this.setInitialStation();
  }

  selectedStop = <BehaviorSubject<number>>new BehaviorSubject(null);

  private setInitialStation() {
    console.log('Closest');
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getClosestStation(position);
      },
      error => {
        console.log('Error: ', error);
        this.selectedStop.next(this.stopService.getAllStops[0]['id']);
      });
  }

  getClosestStation(position: Position) {

    let params = new HttpParams();
    params = params.append('la', '' + position.coords.latitude);
    params = params.append('lo', '' + position.coords.longitude);

    this.http.get<number>('https://tram-api.wiklandia.io/station/closestId', {params: params} ).subscribe(data => {
      console.log(data);
      this.selectedStop.next(data);
    });
  }

  getCurrentPosition(): Position {
    // departures: Observable<Departure[]>;
    return null;
  }

}
