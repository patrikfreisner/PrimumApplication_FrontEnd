import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../Models/order.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {MoipOrderService} from '../Services/MoipOrders/moip-order.service';
import {SearchService} from '../Services/SearchManager/search.service';
import {Router} from '@angular/router';
import {PaymentBankSlip} from '../Models/paymentBankSlip';
import {MoipPaymentService} from '../Services/MoipPayments/moip-payment.service';
import {HelpersModule} from '../../Helpers/helpers.module';

@Component({
  selector: 'app-cp-payments',
  templateUrl: './cp-payments.component.html',
  styleUrls: ['./cp-payments.component.css']
})
export class CpPaymentsComponent implements OnInit {

  payments: PaymentBankSlip[];
  payment_expired: PaymentBankSlip[];
  form: FormGroup;

  firstD: string;
  month: string;
  year: string;

  @ViewChild('tabs')
  private tabs: NgbTabset;

  constructor(
    private fb: FormBuilder,
    private paymentService: MoipPaymentService,
    private helpers: HelpersModule
  ) {
    this.getMoipPayments();
    this.getMoipExpiredPayments();
  }

  ngOnInit() {
  }

  private getMoipPayments(): void {
    this.paymentService.getMoipPayments().subscribe(
      (payments) => this.payments = payments
    );
  }
  private getMoipExpiredPayments(): void {
    this.paymentService.getMoipExpiredPayments().subscribe(
      (payments_expired) => this.payment_expired = payments_expired
    );
  }

  private updateAllMoipPayments(): PaymentBankSlip[] {
    let payments: PaymentBankSlip[];
    this.paymentService.updateAllPayments().subscribe(
      (payment) => {
        payments = payment;
        this.getMoipPayments();
      }
    );
    return payments;
  }

  private toMoney(number: number): string {
    let valor: string;
    let th: string;
    let th2: string;
    let rest: string;

    valor = number.toString();

    if (valor.length === 4) {
      th = valor.slice(0, 2);
      rest = valor.slice(2, 4);
      valor = th + ',' + rest;
    } else if (valor.length === 5) {
      th = valor.slice(0, 3);
      rest = valor.slice(3, 5);
      valor = th + ',' + rest;
    } else if (valor.length === 6) {
      th = valor.slice(0, 1);
      th2 = valor.slice(1, 4);
      rest = valor.slice(4, 6);
      valor = th + '.' + th2 + ',' + rest;
    }

    return valor;
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
