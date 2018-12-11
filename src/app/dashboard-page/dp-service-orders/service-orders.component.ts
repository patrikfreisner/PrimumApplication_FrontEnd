import {Component, OnInit} from '@angular/core';
import {Clientserviceorder} from '../Models/clientserviceorder';
import {ClientserviceorderService} from '../Services/ModelServices/clientserviceorder.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../Services/SearchManager/search.service';
import {Clientcust} from '../Models/clientcust.model';
import {ClientcustService} from '../Services/ModelServices/clientcust.service';

@Component({
  selector: 'app-service-orders',
  templateUrl: './service-orders.component.html',
  styleUrls: ['./service-orders.component.css']
})
export class ServiceOrdersComponent implements OnInit {
  page: number;
  clientcusts: Clientcust[];
  clientcust: Clientcust;
  service_order: Clientserviceorder;
  serviceorders: Clientserviceorder[];
  soForm: FormGroup;
  IsEditable: false;

  constructor(
    public soService: ClientserviceorderService,
    public searchService: SearchService,
    public customerService: ClientcustService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.getServiceOrders(1);
    this.formServiceOrderBuilder();
    this.getClientCustBySearch('');
    this.page = 1;
  }

  ngOnInit() {
  }

  private pageNext(): void {
    this.page += 1;
    this.getServiceOrders(this.page);
    if (this.serviceorders.length === 0) {
      this.page -= 1;
    }
  }

  private pageBack(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.getServiceOrders(this.page);
    }
  }

  public openModal(content, size): void {
    this.soForm = null;
    this.formServiceOrderBuilder();
    this.modalService.open(content, {size: size});
    this.getClientCustBySearch('');
  }

  public getServiceOrders(page): void {
    this.soService.getServiceOrder(page).subscribe(
      (service_order) => this.serviceorders = service_order
    );
  }

  public getClientCustBySearch(object: string): void {
    this.searchService.getClientcustBySearch('name', object).subscribe(
      (clientcust) => {
        this.clientcusts = clientcust;
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
        this.clientcust = clientcust;
      },
      () => alert('error')
    );
    return this.clientcust;
  }

  public getSOBySearch(id: number): void {
    this.searchService.getServiceOrderBySearch('id', id.toString()).subscribe(
      (so) => this.serviceorders = so,
      () => alert('Error!')
    );
  }

  public getSObyId(id: number, content, setToForm): Clientserviceorder {
    this.IsEditable = false;
    if (content != null) {
      this.modalService.open(content);
    }
    this.soService.getServiceOrderById(id).subscribe(
      (so) => {
        this.service_order = so;
        if (setToForm === true) {
          this.soForm.patchValue(this.service_order);
        }
      }
    );
    return this.service_order;
  }

  private addNew(): void {
    this.service_order = this.soForm.value;
    this.service_order.Clientcust_id = this.clientcust.id;
    this.service_order.order_init_date = new Date().toLocaleDateString('latn');
    this.service_order.status = 'Em aberto';

    this.soService.createServiceOrder(this.service_order)
      .subscribe(
        () => {
          this.getServiceOrders(1);
        },
        () => alert('ocorreu um erro!')
      );
  }

  private updateServiceOrder(so: Clientserviceorder): void {
    this.service_order = this.soForm.value;

    this.soService.updateServiceOrder(this.service_order)
      .subscribe(
        () => this.getServiceOrders(1),
        () => alert('Ocorreu um erro!')
      );
  }

  private deleteServiceOrder(id): void {
    this.soService.deleteServiceOrder(id).subscribe(
      () => {
        this.getServiceOrders(1);
        this.service_order = null;
      }
    );
  }

  private formServiceOrderBuilder(): void {
    this.soForm = this.fb.group({
      id: '',
      devicetype: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      accessories: [''],
      details: [''],
      order_init_date: [''],
      order_end_date: [''],
      service: [''],
      reported_defect: ['', Validators.required],
      solution: [''],
      comments: [''],
      advance_payment: [''],
      advance_payment_value: [''],
      status: ['']
    });
  }

}
