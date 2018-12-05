import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../../Models/customer.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoipCustomerService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  apiMoipServiceUrl = 'http://localhost:3000/api/dp-customers';

  constructor(private http: HttpClient) {
  }

  public getMoipCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiMoipServiceUrl).pipe(
      tap((customer: Customer) => console.log('Loaded Client')),
      catchError(this.handleError<Customer>('getMoipCustomers'))
    );
  }

  public getMoipCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Customer>(`getHero id=${id}`))
    );
  }

  public createMoipIDForCustomer(id: number): Observable<Customer> {
    const url = `http://localhost:3000/api/customers_moip/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log(`created moip id=${id}`)),
      catchError(this.handleError<Customer>(`Error createMoipIDForCustomer id=${id}`))
    );
  }

  public createMoipCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiMoipServiceUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', customer))
      );
  }

  public deleteMoipCustomer(id: number): Observable<{}> {
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

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
