import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../Service/auth.service';
import {Router} from '@angular/router';
import {User} from '../Models/user.model';
import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnChanges {

  loaded: boolean;
  userdata: User;

  constructor(
    private authService: AuthService
  ) {
    this.loaded = false;
    this.userData();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  public userData(): void {
    this.authService.getCurrentUserData().then(
      (user) => {
        this.userdata = user;
        this.check();
      }
    );
  }

  public check() {
    try {
      if (this.userdata.company.fantasy_name != null) {
        setTimeout(() => {
          this.loaded = true;
        }, 1500);
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.log(e);
      }
    }
  }

}
