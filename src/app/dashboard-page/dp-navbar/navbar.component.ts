import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../Services/ModalServices/modal.service';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user.model';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelpersModule} from '../../Helpers/helpers.module';
import {Role} from '../../Models/role.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [HelpersModule]
})
export class NavbarComponent implements OnInit {

  @Input() userdata: User;
  passwordForm: FormGroup;
  roleForm: FormGroup;
  compForm: FormGroup;
  comp_logo = '../../../assets/LOGO_PRIMUM_WHITE.png';
  current_user: User;
  user: User;
  roleId: number;
  roles: Role[];
  system_info = 'Rhodonite';
  system_version = '1.0.0';
  system_info_content = ' A Rhodonite é o primeiro sistema desenvolvido pela Primum Tecnologia e é o mais simples atualmente. Rhodonite segue' +
    ' os principios basico para que qualquer empresario possa ter um sistema de gestão de clientes funcional e simples, sem gastar um fortuna em ' +
    'outros acessorios que geralmente vem junto. A Rhodonite nasceu para ser perfeita para quem ta começando e quer trabalhar serio, ' +
    'dar um rosto mais profissional e serio a empresa e nos estamos aqui para te ajudar e ver você crescer!';
  IsEditable: boolean;
  verified: boolean;
  notVerified: string;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private authService: AuthService,
    private helperService: HelpersModule,
    private router: Router) {
    this.IsEditable = false;
    this.formServiceOrderBuilder();
    this.formCompaniesBuilder();
    this.formPasswordChangeBuilder();
  }

  ngOnInit() {
    this.current_user = this.userdata;
    this.user = this.userdata;
    this.IsEditable = false;
    this.compForm.patchValue(this.userdata.Company);
    this.roleId = this.userdata.Company.Role_id;
    this.roles = [];
    this.roles.push(this.userdata.Company.Role);
    this.verified = false;
    this.notVerified = '';
    // this.userData();
  }

  open(content, options: {}) {
    this.formPasswordChangeBuilder();
    this.notVerified = '';
    this.verified = false;
    this.modalService.open(content, options);
  }

  public toMoney(numb: number): string {
    return this.helperService.toMoney(numb);
  }

  public dateChange(str: string, type: string): string {
    return this.helperService.dateChange(str, type);
  }

  public verififyInformations(info1, info2): void {
    if ((info2 === this.current_user.Company.Customer.cpf) &&
      (info1 === this.dateChange(this.current_user.Company.Customer.birthdate, 'toHTML'))) {
      this.verified = true;
    } else {
      this.notVerified = 'Dados informados estão incorretos!';
    }
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

  public changePassword(): void {
    this.verified = false;
    let data = {
      current_password: null,
      new_password: null,
      confirm_password: null,
    };
    data = this.passwordForm.value;
    this.authService.changePassword(data.new_password, data.confirm_password, data.current_password).subscribe(
      () => this.verified = true,
      (error) => {
        this.notVerified = JSON.parse(error._body).errors.full_messages;
      }
    );
  }

  public passwordValidator(form: FormGroup): void {
    if (form.get('new_password').value === form.get('confirm_password').value && !form.get('confirm_password').errors) {
      form.get('confirm_password').setErrors(null);
    } else {
      form.get('confirm_password').setErrors({'mismatch': true});
    }
  }

  private formServiceOrderBuilder(): void {
    this.roleForm = this.fb.group({
      id: [''],
    });
  }

  private formPasswordChangeBuilder(): void {
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    }, {validator: this.passwordValidator});
  }

  private formCompaniesBuilder(): void {
    this.compForm = this.fb.group({
      id: [''],
      cnpj: [''],
      company_name: [''],
      fantasy_name: [''],
      responsable: [''],
      foundation_date: [''],
      company_subject: [''],
      company_phone: [''],
      Role_id: [''],
    });
  }

}
