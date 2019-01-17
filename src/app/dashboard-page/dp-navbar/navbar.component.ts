import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../Services/ModalServices/modal.service';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user.model';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelpersModule} from '../../Helpers/helpers.module';
import {Role} from '../../Models/role.model';
import {Company} from '../../Models/company.model';
import {CompaniesService} from '../../control-panel/Services/Companies/companies.service';

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
  imageSrc: any;
  imageForm: FormGroup;
  comp_size = [
    {
      label: 'Tamanho 30x30 px',
      value: '3030'
    },
    {
      label: 'Tamanho 30x60 px',
      value: '3060'
    }
  ];
  comp_size_number: string;
  logo_sizeW: number;
  logo_sizeH: number;


  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private authService: AuthService,
    private helperService: HelpersModule,
    private companiesService: CompaniesService,
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
    this.compForm.patchValue(this.userdata.company);
    this.roleId = this.userdata.company.role_id;
    this.roles = [];
    this.roles.push(this.userdata.company.role);
    this.verified = false;
    this.notVerified = '';
    this.imageSrc = this.current_user.company.company_logo;
    this.imageForm = this.fb.group({
      imageData: [''],
      logo_size: [''],
    });
    if (this.current_user.company.company_logo !== 'default') {
      this.comp_logo = this.current_user.company.company_logo;
    }

    this.comp_size_number = this.userdata.company.logo_size;
    // this.userData();


    if (this.userdata.company.logo_size === '3030') {
      this.logo_sizeH = 30;
      this.logo_sizeW = 30;
    } else if (this.userdata.company.logo_size === '3060') {
      this.logo_sizeH = 30;
      this.logo_sizeW = 60;
    }
  }

  public check(): void {
    let data = {
      imageData: null
    };
    data = this.imageForm.value;
    alert(' ////// ' + data.imageData);
  }

  public _handleReaderLoaded(e) {
    this.imageSrc = btoa(e.target.result);
    console.log(btoa(e.target.result));
  }

  public handleFileSelect(evt) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  public updateLogo(): void {
    let company: any;

    company = {
      cnpj: this.current_user.company.cnpj,
      fantasy_name: this.current_user.company.fantasy_name,
      company_name: this.current_user.company.company_name,
      responsable: this.current_user.company.responsable,
      foundation_date: this.current_user.company.foundation_date,
      company_subject: this.current_user.company.company_subject,
      company_phone: this.current_user.company.company_phone,
      company_logo: this.imageSrc,
      logo_size: this.imageForm.get('logo_size').value,
      Customer_id: this.current_user.company.customer_id,
      Role_id: this.current_user.company.role_id,
      id: this.current_user.company.id,
    };


    this.companiesService.updateCompany(company as Company).subscribe(
      () => {
        alert('Logo alterada, por favor atualize a pagina!');
      },
      (error) => {
        alert('Um erro ocorreu! // ' + error);
      }
    );
  }

  open(content, options: {}) {
    this.imageForm.patchValue({logo_size: this.userdata.company.logo_size});
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
      company_logo: [''],
      Role_id: [''],
    });
  }

}
