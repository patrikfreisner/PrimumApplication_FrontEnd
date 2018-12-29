import {Component} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {HttpHeaders} from '@angular/common/http';

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
      apiBase: 'http://localhost:3000',
      // apiBase: 'http://192.168.0.101:3000/',
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
