import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  response: any[];
  lat: number;
  lon: number;

  constructor(private http: HttpClient) {}

  onClickGetStations() {
    console.log('Hejsan!', this.http);
    this.http.get<any[]>('http://localhost:8080/station/stops').subscribe(data => {
      console.log(data);
      this.response = data;
    });
  }

  onClickGetClosest() {
    console.log('Closest');
    navigator.geolocation.getCurrentPosition(
      position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      },
      error => console.log('Error: ', error));
  }

}
