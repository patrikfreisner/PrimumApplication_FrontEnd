import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../Models/customer.model';
import {MoipCustomerService} from '../Services/MoipCustomer/moip-customer.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {NgbModal, NgbTabContent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {HelpersModule} from '../../helpers/helpers.module';

@Component({
  selector: 'app-cp-customers',
  templateUrl: './cp-customers.component.html',
  styleUrls: ['./cp-customers.component.css']
})
export class CpCustomersComponent implements OnInit {
  customer: Customer;
  customers: Array<Customer>;
  customerMoipForm: FormGroup;

  @ViewChild('tabs')
  private tabs: NgbTabset;

  @ViewChild('scrollnone')
  private scroll: NgbTabContent;

  constructor(
    private customerService: MoipCustomerService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private helperModule: HelpersModule
  ) {

    this.getMoipCustomers();
    this.formCustomerMoipbuilder();

  }

  ngOnInit() {
    $(document).ready(function () {
      const screen = $(window).height() - ($(window).height() * 0.40);
      this.scroll.height(screen + 'px');
      $(window).resize(function () {
        $('#scrollnone').height($(window).height() - ($(window).height() * 0.31) + 'px');
      });
    });
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
    return this.helperModule.dateChange(data, type);
  }
}
