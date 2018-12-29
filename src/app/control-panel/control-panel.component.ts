import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Service/auth.service';
import {User} from '../Models/user.model';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  company = 'Primum';
  comp_logo = '../../../assets/LOGO_PRIMUM_WHITE.png';
  img_url = 'https://png.icons8.com/ios/1600/xbox-menu.png';
  current_user: User;

  constructor(
    private authService: AuthService,
  ) {
    this.userData();
  }

  ngOnInit() {
  }

  async userData(): Promise<void> {
     const data = this.authService.getCurrentUserData().then(
      (user) => {
         this.current_user = user;
      }
    );
  }

}
