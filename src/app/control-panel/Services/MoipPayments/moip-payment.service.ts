import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {PaymentBankSlip} from '../../Models/paymentBankSlip';
import {HelpersModule} from '../../../helpers/helpers.module';
import {Angular2TokenService} from 'angular2-token';
import {Order} from '../../Models/order.model';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MoipPaymentService {

  apiMoipServiceUrl = 'api/payment_bank_slips';

  constructor(
    private http: Angular2TokenService,
    private helpers: HelpersModule
  ) {

  }

  public getMoipPayments(): Observable<PaymentBankSlip[]> {
    return this.http.get(this.apiMoipServiceUrl).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const PaymentCollection: PaymentBankSlip[] = [];

        collection.forEach(item => {
          PaymentCollection.push(item as PaymentBankSlip);
        });

        return PaymentCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getMoipExpiredPayments(): Observable<PaymentBankSlip[]> {
    let displayDate = new Date().toLocaleDateString();
    displayDate = this.helpers.dateChange(displayDate, 'toSearchDate');
    const url = `api/searchPayment?q[expirationdate_lt]=${displayDate}&q[paid_eq]=false`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const PaymentCollection: PaymentBankSlip[] = [];

        collection.forEach(item => {
          PaymentCollection.push(item as PaymentBankSlip);
        });

        return PaymentCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getMoipPaymentById(id: number): Observable<PaymentBankSlip> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(this.apiMoipServiceUrl).pipe(
      tap((payments: PaymentBankSlip) => {
        return payments;
        console.log('Loaded Order');
      }),
      catchError(this.handleError)
    );
  }

  public createMoipPayment(payment: PaymentBankSlip): Observable<PaymentBankSlip> {
    return this.http.post(this.apiMoipServiceUrl, payment).pipe(
      map((resp: Response) => {
        const payment1 = resp.json();
        return payment1 as PaymentBankSlip;
      }),
      catchError(this.handleError)
    );
  }

  public updateAllPayments(): Observable<PaymentBankSlip[]> {
    const url = 'api/payment_update';
    return this.http.get(this.apiMoipServiceUrl).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const PaymentCollection: PaymentBankSlip[] = [];

        collection.forEach(item => {
          PaymentCollection.push(item as PaymentBankSlip);
        });

        return PaymentCollection;
      }),
      catchError(this.handleError)
    );
  }

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
