import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../Services/ModalServices/modal.service';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  @Input() userdata: User;
  comp_logo = '../../../assets/LOGO_PRIMUM_WHITE.png';
  current_user: User;
  system_info = 'Rhodonite';
  system_version = '1.5.1';
  system_info_content = ' A Rhodonite é o primeiro sistema desenvolvido pela Primum Tecnologia e é o mais simples atualmente. Rhodonite segue' +
    ' os principios basico para que qualquer empresario possa ter um sistema de gestão de clientes funcional e simples, sem gastar um fortuna em ' +
    'outros acessorios que geralmente vem junto. A Rhodonite nasceu para ser perfeita para quem ta começando e quer trabalhar serio, quem quer ' +
    'dar um rosto serio a empresa e nos estamos aqui para te ajudar e ver você crescer!';

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.current_user = this.userdata;
    // this.userData();
  }

  open(content, options: {}) {
    this.modalService.open(content, options);
  }

  // public userData(): void {
  //   this.authService.getCurrentUserData().subscribe(
  //     (user) => {
  //       this.current_user = user;
  //     }
  //   );
  // }

  public signOut(): void {
    this.authService.signOut().subscribe(
      () => this.router.navigate(['/portal/signin'])
    );
  }

}
