import {Component} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private tokenService: Angular2TokenService
  ) {
    this.tokenService.init({
      apiBase: 'http://178.128.79.84:3000',
      globalOptions: {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        }
      }
    })
    ;
  }
}
