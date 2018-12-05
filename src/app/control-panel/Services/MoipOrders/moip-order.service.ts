import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Customer} from '../../Models/customer.model';
import {catchError, tap} from 'rxjs/operators';
import {Order} from '../../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class MoipOrderService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  apiMoipServiceUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {
  }

  public getMoipOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiMoipServiceUrl).pipe(
      tap((order: Order) => console.log('Loaded Order')),
      catchError(this.handleError<Order>('getMoipOrders'))
    );
  }

  public getMoipOrderById(id: number): Observable<Order> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Order>(`getHero id=${id}`))
    );
  }

  public createMoipOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiMoipServiceUrl, order, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', order))
      );
  }

  public deleteMoipOrder(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteMoipOrder'))
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
