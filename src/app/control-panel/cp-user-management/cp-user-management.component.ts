import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../Services/Companies/companies.service';
import {User} from '../../Models/user.model';
import {MoipCustomerService} from '../Services/MoipCustomer/moip-customer.service';
import {SearchService} from '../Services/SearchManager/search.service';
import {Customer} from '../Models/customer.model';
import {ModalService} from '../../dashboard-page/Services/ModalServices/modal.service';
import {HelpersModule} from '../../Helpers/helpers.module';
import {Company} from '../../Models/company.model';
import {Observable} from 'rxjs';
import {Role} from '../../Models/role.model';
import {UserManagementService} from '../Services/UsersManagement/user-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cp-user-management',
  templateUrl: './cp-user-management.component.html',
  styleUrls: ['./cp-user-management.component.css'],
  providers: [HelpersModule]
})
export class CpUserManagementComponent implements OnInit {

  IsEditable: boolean;
  roleForm: FormGroup;
  compForm: FormGroup;
  roleId: number;
  customersMoip: Customer[];
  customerMoip: Customer;
  company: Company;
  users: User[];
  allUsers: User[];
  user: User;
  roles: Role[];
  role: Role;
  choosedCustomer: number;
  choosedRole: number;

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private customerMoipService: MoipCustomerService,
    private userService: UserManagementService,
    private searchService: SearchService,
    private modalService: ModalService,
    private helperService: HelpersModule
  ) {
    this.formServiceOrderBuilder();
    this.formCompaniesBuilder();
    this.getUsersBySearch('', '');
    this.getUserWithoutCompany();
    this.customersMoip = this.getClientBySearch('fullname', '');
    this.roles = this.getRoleBySearch('details', '');
    this.choosedCustomer = 0;
    this.choosedRole = 0;
    this.IsEditable = false;
  }

  ngOnInit() {
  }

  public toMoney(numb: number): string {
    return this.helperService.toMoney(numb);
  }

  public dateChange(str: string, type: string): string {
    return this.helperService.dateChange(str, type);
  }

  private getUsersBySearch(object: string, term: string): void {
    this.searchService.getUserBySearch(object, term).subscribe(
      (users) => {
        this.allUsers = users;
      },
      () => alert('Erro ao buscar usuarios!')
    );
  }

  private getUserById(id, content): void {

    this.IsEditable = false;

    this.userService.getUserById(id).subscribe(
      (user) => {
        this.user = user;

        this.roleId = user.Company.Role.id;

        this.compForm.patchValue(user.Company);

        if (!(content == null)) {
          this.choosedCustomer = 0;
          this.modalService.open(content, {size: 'lg'});
        }
      },
      () => alert('Erro ao carregar usuario!')
    );
  }

  public getUserWithoutCompany(): void {
    this.companiesService.getUsersWithoutCompany().subscribe(
      (users) => {
        this.users = users;
      },
      () => alert('Erro ao buscar usuarios!')
    );
  }

  public setCustomerToNumber(id): void {
    this.choosedCustomer = id;
  }

  public setRoleToNumber(id): void {
    this.choosedRole = id;
  }

  public setCompany(comp: Company, content): void {
    if (!(content == null)) {
      this.choosedCustomer = 0;
      this.modalService.open(content, {size: 'lg'});
    }

    this.company = comp;
  }

  public setRole(comp: Company, content): void {
    if (!(content == null)) {
      this.choosedRole = comp.Role.id;
      this.modalService.open(content, {size: 'lg'});
    }

    this.company = comp;
  }

  public openModal(content, size: String): void {
    this.modalService.open(content, {size: size});
  }

  public getClientBySearch(object: string, term: string): Customer[] {
    this.searchService.getCustomerBySearch(object, term).subscribe(
      (customers) => this.customersMoip = customers
    );
    return this.customersMoip;
  }

  public getRoleBySearch(object: string, term: string): Role[] {
    this.searchService.getRoleBySearch(object, term).subscribe(
      (role) => this.roles = role
    );
    return this.roles;
  }

  public updateCompanyMoip(): void {

    this.company.Customer_id = this.choosedCustomer;

    this.companiesService.updateCompany(this.company).subscribe(
      () => {
        this.getUserWithoutCompany();
        this.getUsersBySearch('name', '');
      },
      (error) => {
        alert('Um erro ocorreu! // ' + error);
      }
    );
  }

  public updateRole(source: string): void {

    let company: any;

    if (source === 'upd') {
      company = this.compForm.value;
      company.Role_id = this.roleId;
    } else {

      this.company.Role_id = this.choosedRole;
      company = {
        cnpj: this.company.cnpj,
        fantasy_name: this.company.fantasy_name,
        company_name: this.company.company_name,
        responsable: this.company.responsable,
        foundation_date: this.company.foundation_date,
        company_subject: this.company.company_subject,
        company_phone: this.company.company_phone,
        Customer_id: this.company.Customer_id,
        Role_id: this.company.Role_id,
        id: this.company.id,
      };
    }


    this.companiesService.updateCompany(company as Company).subscribe(
      () => {
        this.getUserWithoutCompany();
        this.getUsersBySearch('name', '');
      },
      (error) => {
        alert('Um erro ocorreu! // ' + error);
      }
    );
  }

  private formServiceOrderBuilder(): void {
    this.roleForm = this.fb.group({
      id: [''],
    });
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
