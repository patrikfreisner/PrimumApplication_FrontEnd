import { Component, OnInit } from '@angular/core';
import {CompaniesService} from '../Services/Companies/companies.service';
import {User} from '../../Models/user.model';

@Component({
  selector: 'app-cp-user-management',
  templateUrl: './cp-user-management.component.html',
  styleUrls: ['./cp-user-management.component.css']
})
export class CpUserManagementComponent implements OnInit {

  users: User[];

  constructor(
    private companieService: CompaniesService
  ) {
    this.getUserWithoutCompany();
  }

  ngOnInit() {
  }

  public getUserWithoutCompany(): void {
    this.companieService.getUsersWithoutCompany().subscribe(
      (users) => {
        this.users = users;
      },
      () => alert('Erro ao buscar usuarios!')
    );
  }

}
