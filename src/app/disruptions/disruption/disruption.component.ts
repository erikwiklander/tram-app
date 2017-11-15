import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Disruption } from './../../model/disruption.model';
import { DisruptionService } from './../../services/disruption.service';

@Component({
  selector: 'app-disruption',
  templateUrl: './disruption.component.html',
  styleUrls: ['./disruption.component.css']
})
export class DisruptionComponent implements OnInit, OnDestroy {

  private disruptionSubscrption: Subscription;
  disruptions: Disruption[] = [];

  constructor(private disruptionService: DisruptionService) { }

  ngOnInit() {
    this.disruptionSubscrption = this.disruptionService.getDepartureBehavior().subscribe(
      (disruptions: Disruption[]) => this.disruptions = disruptions
    );
  }

  ngOnDestroy(): void {
    this.disruptionSubscrption.unsubscribe();
  }

}
