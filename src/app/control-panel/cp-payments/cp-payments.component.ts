import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../Models/order.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {MoipOrderService} from '../Services/MoipOrders/moip-order.service';
import {SearchService} from '../Services/SearchManager/search.service';
import {Router} from '@angular/router';
import {PaymentBankSlip} from '../Models/paymentBankSlip';
import {MoipPaymentService} from '../Services/MoipPayments/moip-payment.service';
import {HelpersModule} from '../../helpers/helpers.module';

@Component({
  selector: 'app-cp-payments',
  templateUrl: './cp-payments.component.html',
  styleUrls: ['./cp-payments.component.css']
})
export class CpPaymentsComponent implements OnInit {

  payments: PaymentBankSlip[];
  payment_expired: PaymentBankSlip[];

  @ViewChild('tabs')
  private tabs: NgbTabset;

  constructor(
    private fb: FormBuilder,
    private paymentService: MoipPaymentService,
    private helperModule: HelpersModule
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
    return this.helperModule.toMoney(number);
  }

  private dateChange(data: string, type: string): string {
    return this.helperModule.dateChange(data, type);
  }


}
