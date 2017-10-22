import { Stop } from './../model/stop.model';
import { Injectable } from '@angular/core';

@Injectable()
export class StopService {

  constructor() { }

  private stops: Stop[] = [
    {name: 'Solna station', 'id': 740000759},
    {name: 'Solna centrum', 'id': 740064053},
    {name: 'Solna business park', 'id': 740064052},
    {name: 'Sundbybergs centrum', 'id': 740064286},
    {name: 'Bällsta bro', 'id': 740064051},
    {name: 'Karlsbodavägen', 'id': 740064044},
    {name: 'Norra Ulvsunda', 'id': 740064041},
    {name: 'Johannesfred', 'id': 740071178},
    {name: 'Alvik', 'id': 740020755},
    {name: 'Alviks strand', 'id': 740024925},
    {name: 'Stora Essingen', 'id': 740024924},
    {name: 'Gröndal', 'id': 740024923},
    {name: 'Trekanten', 'id': 740024922},
    {name: 'Liljeholmen', 'id': 740004046},
    {name: 'Årstadal', 'id': 740024921},
    {name: 'Årstaberg', 'id': 740024920},
    {name: 'Årstafältet', 'id': 740024919},
    {name: 'Valla torg', 'id': 740024684},
    {name: 'Linde', 'id': 740024918},
    {name: 'Globen', 'id': 740021706},
    {name: 'Gullmarsplan', 'id': 740021705},
    {name: 'Mårtensdal', 'id': 740024928},
    {name: 'Luma', 'id': 740024929},
    {name: 'Sickla kaj', 'id': 740024926},
    {name: 'Sickla udde', 'id': 740024927},
    {name: 'Sickla', 'id': 740024807}];

  public getAllStops(): Stop[] {
    return this.stops;
  }

}
