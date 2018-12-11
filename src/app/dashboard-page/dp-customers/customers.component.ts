import {Component, OnInit} from '@angular/core';
import {ClientcustService} from '../Services/ModelServices/clientcust.service';
import {Clientcust} from '../Models/clientcust.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../Services/SearchManager/search.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  page: number;
  public customerForm: FormGroup;
  customers: Clientcust[];
  public customer: Clientcust;
  IsEditable: false;

  constructor(
    private customerService: ClientcustService,
    private searchService: SearchService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.getCustomers(1);
    this.formCustomerBuilder();
    this.page = 1;
  }

  ngOnInit() {
  }

  public openModal(content): void {
    this.customerForm = null;
    this.formCustomerBuilder();
    this.modalService.open(content);
  }

  private pageNext(): void {
    this.page += 1;
    this.getCustomers(this.page);
    if (this.customers.length === 0) {
      this.page -= 1;
    }
  }

  private pageBack(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.getCustomers(this.page);
    }
  }

  private getCustomers(page): void {
    this.customerService.getCustomers(page).subscribe(
      (customers) => this.customers = customers
    );
  }

  public getClientCustBySearch(object: string): void {
    this.searchService.getClientcustBySearch('name', object).subscribe(
      (clientcust) => {
        this.customers = clientcust;
      }
    );
  }

  private getCustomerById(id: number, content, setToForm): Clientcust {
    this.IsEditable = false;
    if (content != null) {
      this.modalService.open(content);
    }
    this.customerService.getCustomerById(id).subscribe(
      (clientcust) => {
        this.customer = clientcust;
        if (setToForm === true) {
          this.customerForm.patchValue(this.customer);
        }
      }
    );
    return this.customer;
  }

  private addNew(): void {
    this.customer = this.customerForm.value;

    this.customerService.createCustomer(this.customer)
      .subscribe(
        () => {
          this.getCustomers(1);
        },
        () => alert('ocorreu um erro!')
      );
  }

  private updateCustomer(customer: Clientcust): void {
    this.customer = this.customerForm.value;

    this.customerService.updateCustomer(this.customer)
      .subscribe(
        () => this.getCustomers(1),
        () => alert('Ocorreu um erro!')
      );
  }

  private deleteCustomer(id): void {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.getCustomers(1);
        this.customer = null;
      },
      () => alert('Não foi possivel deletar, tente mais tarde!')
    );
  }

  private formCustomerBuilder(): void {
    this.customerForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      lastname: ['', [Validators.required]],
      birthdate: [''],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      rg: [''],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      landline: [''],
      address: ['', [Validators.required]],
      house_number: [''],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

}
