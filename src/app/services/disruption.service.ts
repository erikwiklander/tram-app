import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Disruption } from './../model/disruption.model';
import { environment } from './../../environments/environment';

@Injectable()
export class DisruptionService {

  constructor(private http: HttpClient) { }

  disruptions = <BehaviorSubject<Disruption[]>>new BehaviorSubject([]);

  getDepartureBehavior(): BehaviorSubject<Disruption[]> {
    return this.disruptions;
  }

  updateDisruptions() {
    this.http.get<Disruption[]>(environment.backend + '/disruptions').subscribe(
      disruptions => this.disruptions.next(disruptions),
      (errorResponse: HttpErrorResponse) => console.log('Could not get disruptions', errorResponse)
    );
  }

}
