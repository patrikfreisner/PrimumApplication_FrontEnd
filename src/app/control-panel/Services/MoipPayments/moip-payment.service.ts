import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {PaymentBankSlip} from '../../Models/paymentBankSlip';
import {HelpersModule} from '../../../helpers/helpers.module';

@Injectable({
  providedIn: 'root'
})
export class MoipPaymentService {
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  apiMoipServiceUrl = 'http://localhost:3000/api/payment_bank_slips';

  constructor(
    private http: HttpClient,
    private helpers: HelpersModule
  ) {

  }

  public getMoipPayments(): Observable<PaymentBankSlip[]> {
    return this.http.get<PaymentBankSlip[]>(this.apiMoipServiceUrl).pipe(
      tap((payments: PaymentBankSlip) => console.log('Loaded Order')),
      catchError(this.handleError<PaymentBankSlip>('getMoipOrders'))
    );
  }

  public getMoipExpiredPayments(): Observable<PaymentBankSlip[]> {
    let displayDate = new Date().toLocaleDateString();
    displayDate = this.helpers.dateChange(displayDate, 'toSearchDate');
    const url = `http://localhost:3000/api/searchPayment?q[expirationdate_lt]=${displayDate}&q[paid_eq]=false`;
    return this.http.get<PaymentBankSlip[]>(url).pipe(
      tap((payments: PaymentBankSlip) => console.log('Loaded Order')),
      catchError(this.handleError<PaymentBankSlip>('getMoipOrders'))
    );
  }

    public getMoipPaymentById(id: number): Observable<PaymentBankSlip> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get<PaymentBankSlip>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<PaymentBankSlip>(`getHero id=${id}`))
    );
  }

  public createMoipPayment(payment: PaymentBankSlip): Observable<PaymentBankSlip> {
    return this.http.post<PaymentBankSlip>(this.apiMoipServiceUrl, payment, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', payment))
      );
  }

  public updateAllPayments(): Observable<PaymentBankSlip[]> {
    const url = 'http://localhost:3000/api/payment_update';
    return this.http.get<PaymentBankSlip[]>(url).pipe(
      tap(_ => console.log(`Update all payments`)),
      catchError(this.handleError<PaymentBankSlip[]>(`Update all payments failed`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
