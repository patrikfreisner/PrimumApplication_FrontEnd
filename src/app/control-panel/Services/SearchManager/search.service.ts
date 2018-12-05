import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Customer} from '../../Models/customer.model';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiSearchServiceUrl = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) {
  }

  public getCustomerBySearch(object: string, term: string): Observable<Customer[]> {
    const url = `${this.apiSearchServiceUrl}Cust?q[${object}_cont]=${term}&q[moip_id_cont]=cus`;
    return this.http.get<Customer[]>(url).pipe(
      tap(_ => console.log(`goes object=${object}`)),
      catchError(this.handleError<Customer[]>(`getHero id=${object}`))
    );
  }

  public getOrderBySearch(object: string, term: string): Observable<Order[]> {
    const url = `${this.apiSearchServiceUrl}Order?q[${object}_cont]=${term}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => console.log(`goes object=${object}`)),
      catchError(this.handleError<Order[]>(`getHero id=${object}`))
    );
  }

  public getPaymentBySearch(object: string, term: string): Observable<Order[]> {
    const url = `${this.apiSearchServiceUrl}Payment?q[${object}_cont]=${term}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => console.log(`goes object=${object}`)),
      catchError(this.handleError<Order[]>(`getHero id=${object}`))
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
