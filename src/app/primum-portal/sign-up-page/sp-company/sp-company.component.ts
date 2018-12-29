import { Component, OnInit } from '@angular/core';
import {User} from '../../../Models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/auth.service';
import {Role} from '../../../Models/role.model';
import {Customer} from '../../../control-panel/Models/customer.model';
import {CompaniesService} from '../../../control-panel/Services/Companies/companies.service';
import {Company} from '../../../Models/company.model';

@Component({
  selector: 'app-sp-company',
  templateUrl: './sp-company.component.html',
  styleUrls: ['./sp-company.component.css']
})
export class SpCompanyComponent implements OnInit {

  company: Company;
  companyForm: FormGroup;
  formErrors: Array<String>;
  submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private companiesService: CompaniesService
  ) {
    this.formUserMoipbuilder();
    this.formErrors = null;
    this.submitted = false;
  }

  ngOnInit() {
  }

  public signUpUser(): void {
    this.submitted = true;

    this.company = this.companyForm.value;
    this.companiesService.createCompany(this.company).subscribe(
      () => {
        alert('foi amigao!');
        this.router.navigate(['/portal/signup/company']);
      },
      (error) => {
        this.submitted = false;
        alert('Um erro ocorreu!');
      }
    );
  }

  private formUserMoipbuilder(): void {
    this.companyForm = this.fb.group({
      cnpj: [null, [Validators.required]],
      fantasy_name: [null, [Validators.required]],
      company_name: [null, [Validators.required]],
      responsable: [null, [Validators.required]],
      foundation_date: [null, [Validators.required]],
      company_subject: [null, [Validators.required]],
      company_phone: [null, [Validators.required]],
    });
  }

  public signOut(): void {
    this.authService.signOut().subscribe(
      () => this.router.navigate(['/portal/signin'])
    );
  }


}
