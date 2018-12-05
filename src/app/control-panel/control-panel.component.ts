import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  company = 'Primum';
  comp_logo = '../../../assets/LOGO_PRIMUM_WHITE.png';
  img_url = 'https://png.icons8.com/ios/1600/xbox-menu.png';
  current_user = 'Patrik Reisner';
  constructor() {  }

  ngOnInit() {
  }

}
