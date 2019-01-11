import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting-for-register',
  templateUrl: './waiting-for-register.component.html',
  styleUrls: ['./waiting-for-register.component.css']
})
export class WaitingForRegisterComponent implements OnInit {

  constructor(
    private authService: Angular2TokenService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public signOut(): void {
    this.authService.signOut().subscribe(
      () => this.router.navigate(['/portal/signin'])
    );
  }

}
