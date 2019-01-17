import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../Models/customer.model';
import {MoipOrderService} from '../Services/MoipOrders/moip-order.service';
import {MoipCustomerService} from '../Services/MoipCustomer/moip-customer.service';
import {SearchService} from '../Services/SearchManager/search.service';
import {Order} from '../Models/order.model';
import {NgbModal, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MoipPaymentService} from '../Services/MoipPayments/moip-payment.service';
import {PaymentBankSlip} from '../Models/paymentBankSlip';
import {HelpersModule} from '../../helpers/helpers.module';


@Component({
  selector: 'app-cp-orders',
  templateUrl: './cp-orders.component.html',
  styleUrls: ['./cp-orders.component.css']
})
export class CpOrdersComponent implements OnInit {

  orders: Array<Order>;
  order: Order;
  payment: PaymentBankSlip;
  customersSearch: Array<Customer>;
  customer: Customer;
  orderMoipForm: FormGroup;
  paymentMoipForm: FormGroup;

  @ViewChild('tabs')
  private tabs: NgbTabset;

  @ViewChild('modalCreateOrder')
  private modalCreateOrder: NgbModal;

  constructor(
    private orderService: MoipOrderService,
    private customerservice: MoipCustomerService,
    private paymentService: MoipPaymentService,
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private helperModule: HelpersModule
  ) {
    this.getMoipOrders();
    this.formOrderMoipBuilder();
    this.formPaymentMoipBuilder();
    this.customersSearch = this.searchCustomers('fullname', '');
  }

  ngOnInit() {
  }

  private getMoipOrders(): Order[] {
    this.orderService.getMoipOrders().subscribe(
      (orders) => this.orders = orders
    );

    return this.orders;
  }

  private getCustomerToOrder(id: number, content): Customer {
    this.formOrderMoipBuilder();
    this.modalService.open(content);
    this.customerservice.getMoipCustomerById(id).subscribe(
      (customer) => this.customer = customer
    );
    return this.customer;
  }

  private getMoipOrder(id: number, content): Order {
    if (!(content == null)) {
      this.modalService.open(content);
    }

    this.order = null;
    this.orderService.getMoipOrderById(id).subscribe(
      (order) => this.order = order
    );
    return this.order;
  }

  private searchCustomers(object: string, term: string): Customer[] {
    this.searchService.getCustomerBySearch(object, term).subscribe(
      (customers) => this.customersSearch = customers
    );
    return this.customersSearch;
  }

  private addOrder(): void {
    this.order = this.orderMoipForm.value;
    this.order.item_price = this.order.item_price + '00';
    this.order.customer_id = this.customer.id;

    this.orderService.createMoipOrder(this.order)
      .subscribe(
        () => {
          this.getMoipOrders();
          this.tabs.select('listOrder');
        },
        () => alert('ocorreu um erro!')
      );
    this.customer = null;
    this.orderMoipForm = null;
  }

  private addPayment(): void {
    this.payment = this.paymentMoipForm.value;
    this.payment.order_id = this.order.id;
    this.payment.expirationdate = this.dateChange(this.payment.expirationdate, 'toDB');

    this.paymentService.createMoipPayment(this.payment)
      .subscribe(
        () => {
          this.getMoipOrders();
          this.tabs.select('listOrder');
        },
        () => alert('ocorreu um erro!')
      );
    this.order = null;
    this.paymentMoipForm = null;
  }

  private updateAllMoipPayments(): PaymentBankSlip[] {
    let payments: PaymentBankSlip[];
    this.paymentService.updateAllPayments().subscribe(
      (payment) => {
        payments = payment;
        this.getMoipOrders();
      }
    );
    return payments;
  }

  private deleteOrderMoip(id: number): void {
    this.orderService.deleteMoipOrder(id).subscribe(
      () => {
        this.getMoipOrders();
      }
    );
  }

  private toMoney(number: number): string {
    return this.helperModule.toMoney(number);
  }

  private dateChange(data: string, type: string): string {
    return this.helperModule.dateChange(data, type);
  }

  private formOrderMoipBuilder(): void {
    this.orderMoipForm = this.fb.group({
      customer_id: [''],
      item_product: ['', Validators.required],
      item_quantity: [1],
      item_description: ['', Validators.required],
      item_price: ['', [Validators.required, Validators.min(10)]],
    });
  }

  private formPaymentMoipBuilder(): void {
    this.paymentMoipForm = this.fb.group({
      expirationdate: ['', [Validators.required, Validators.min(8)]],
    });
  }

}
