import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Disruption } from './../model/disruption.model';
import { environment } from './../../environments/environment';

@Injectable()
export class DisruptionService {

  constructor(private http: HttpClient) { }

  disruptures = <BehaviorSubject<Disruption[]>>new BehaviorSubject([]);

  getDepartureBehavior(): BehaviorSubject<Disruption[]> {
    return this.disruptures;
  }

  updateDisruptures() {
    this.http.get<Disruption[]>(environment.backend + '/disruptions').subscribe(
      disruptures => this.disruptures.next(disruptures),
      (errorResponse: HttpErrorResponse) => console.log('Could not get disruptions', errorResponse)
    );
  }

}
