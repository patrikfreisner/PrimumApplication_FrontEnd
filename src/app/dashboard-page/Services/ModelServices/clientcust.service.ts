import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Clientcust} from '../../Models/clientcust.model';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientcustService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  apiMoipServiceUrl = 'http://localhost:3000/api/clientcusts';

  constructor(private http: HttpClient) {
  }
  public getCustomers(): Observable<Clientcust[]> {
    return this.http.get<Clientcust[]>(this.apiMoipServiceUrl).pipe(
      tap((customer: Clientcust) => console.log('Loaded Client')),
      catchError(this.handleError<Clientcust>('getMoipCustomers'))
    );
  }

  public getCustomerById(id: number): Observable<Clientcust> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get<Clientcust>(url).pipe(
      tap((clientcust) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Clientcust>(`getHero id=${id}`))
    );
  }

  public createCustomer(customer: Clientcust): Observable<Clientcust> {
    return this.http.post<Clientcust>(this.apiMoipServiceUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', customer))
      );
  }
  public updateCustomer(customer: Clientcust): Observable<Clientcust> {
    return this.http.put<Clientcust>(`${this.apiMoipServiceUrl}/${customer.id}`, customer, this.httpOptions).pipe(
      catchError(this.handleError('error operação put', customer))
    );
  }

  public deleteCustomer(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteMoipCustomer'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      Observable.throw('Error!');
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
