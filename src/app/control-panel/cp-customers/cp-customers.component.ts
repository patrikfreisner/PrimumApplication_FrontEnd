import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../Models/customer.model';
import {MoipCustomerService} from '../Services/MoipCustomer/moip-customer.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {NgbModal, NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cp-customers',
  templateUrl: './cp-customers.component.html',
  styleUrls: ['./cp-customers.component.css']
})
export class CpCustomersComponent implements OnInit {
  customer: Customer;
  customers: Array<Customer>;
  customerMoipForm: FormGroup;
  firstD: string;
  month: string;
  year: string;

  @ViewChild('tabs')
  private tabs: NgbTabset;

  constructor(
    private customerService: MoipCustomerService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {

    this.getMoipCustomers();
    this.formCustomerMoipbuilder();

  }
  ngOnInit() {
    const screen = ($(window).height() - ($(window).height() * 0.31));
  }


  private getMoipCustomers(): Customer[] {
    this.customerService.getMoipCustomers().subscribe(
      (customer) => this.customers = customer
    );

    return this.customers;
  }

  private getMoipCustomer(id: number, content): Customer {
    if (!(content == null)) {
      this.modalService.open(content);
    }

    this.customer = null;
    this.customerService.getMoipCustomerById(id).subscribe(
      (customer) => {
        if (customer.moip_id == null) {
          customer.moip_id = 'Não foi criado MoipID';
        }
        customer.birthdate = this.dateChange(customer.birthdate, 'toHTML');
        this.customer = customer;
      }
    );
    return this.customer;
  }

  private addNew(): void {
    this.customer = this.customerMoipForm.value;
    this.customer.birthdate = this.dateChange(this.customer.birthdate, 'toDB');

    this.customerService.createMoipCustomer(this.customer)
      .subscribe(
        () => {
          this.getMoipCustomers();
          this.tabs.select('listCustomer');
          this.customerMoipForm = null;
        },
        () => alert('ocorreu um erro!')
      );
  }

  private deleteCustomerMoip(id: number): void {
    this.customerService.deleteMoipCustomer(id).subscribe(
      () => {
        this.getMoipCustomers();
      }
    );
  }

  public createMoipID(id: number): void {
    this.customerService.createMoipIDForCustomer(id).subscribe(
      () => {
        this.getMoipCustomer(id, null);
        this.getMoipCustomers();
      }
    );
  }

  private formCustomerMoipbuilder(): void {
    this.customerMoipForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phonecode: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      rg: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetnumber: ['', [Validators.required]],
      complement: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
    });
  }

  private dateChange(data: string, type: string): string {

    if (type === 'toHTML') {
      this.year = data.slice(0, 4);
      this.month = data.slice(5, 7);
      this.firstD = data.slice(8, 10);
      data = this.firstD + '/' + this.month + '/' + this.year;
      return data;

    } else if (type === 'toDB') {
      this.firstD = data.slice(0, 2);
      this.month = data.slice(2, 4);
      this.year = data.slice(4, 8);
      data = this.year + '-' + this.month + '-' + this.firstD;
      return data;

    }
  }
}
