import { Component, OnInit } from '@angular/core';
import {ModalService} from '../Services/ModalServices/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: ModalService) { }
  company = 'Primum';
  comp_logo = '../../../assets/LOGO_PRIMUM_WHITE.png';
  img_url = 'https://png.icons8.com/ios/1600/xbox-menu.png';
  current_user = {
    name: 'Patrik Reisner',
    role: 'admin'
  };
  system_info = 'Rhodonite';
  system_version = '1.5.1';
  system_info_content = ' A Rhodonite é o primeiro sistema desenvolvido pela Primum Tecnologia e é o mais simples atualmente. Rhodonite segue' +
    ' os principios basico para que qualquer empresario possa ter um sistema de gestão de clientes funcional e simples, sem gastar um fortuna em ' +
    'outros acessorios que geralmente vem junto. A Rhodonite nasceu para ser perfeita para quem ta começando e quer trabalhar serio, quem quer ' +
    'dar um rosto serio a empresa e nos estamos aqui para te ajudar e ver você crescer!';

  ngOnInit() {
  }

  open(content, options: {}) {
    this.modalService.open(content, options);
  }
}
