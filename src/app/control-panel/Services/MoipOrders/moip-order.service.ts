import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Customer} from '../../Models/customer.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Order} from '../../Models/order.model';
import {Angular2TokenService} from 'angular2-token';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MoipOrderService {

  apiMoipServiceUrl = 'api/orders';

  constructor(private http: Angular2TokenService) {
  }

  public getMoipOrders(): Observable<Order[]> {
    return this.http.get(this.apiMoipServiceUrl).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const OrderCollection: Order[] = [];

        collection.forEach(item => {
          OrderCollection.push(item as Order);
        });

        return OrderCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getMoipOrderById(id: number): Observable<Order> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const order = resp.json();
        return order as Order;
      }),
      catchError(this.handleError)
    );
  }

  public createMoipOrder(order: Order): Observable<Order> {
    return this.http.post(this.apiMoipServiceUrl, order).pipe(
      map((resp: Response) => {
        const order1 = resp.json();
        return order1 as Order;
      }),
      catchError(this.handleError)
    );
  }

  public deleteMoipOrder(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
