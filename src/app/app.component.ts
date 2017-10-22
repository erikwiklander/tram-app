import { StopService } from './services/stop.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StopService ]
})
export class AppComponent {

}
