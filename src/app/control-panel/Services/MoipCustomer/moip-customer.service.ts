import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../../Models/customer.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Angular2TokenService} from 'angular2-token';
import {Response} from '@angular/http';
import {Clientserviceorder} from '../../../dashboard-page/Models/clientserviceorder';

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

  apiMoipServiceUrl = 'api/customers';

  constructor(private http: Angular2TokenService) {
  }

  public getMoipCustomers(): Observable<Customer[]> {
    return this.http.get(this.apiMoipServiceUrl).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const CustomerCollection: Customer[] = [];

        collection.forEach(item => {
          CustomerCollection.push(item as Customer);
        });

        return CustomerCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getMoipCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const cust = resp.json();
        return cust as Customer;
      }),
      catchError(this.handleError)
    );
  }

  public createMoipIDForCustomer(id: number): Observable<Customer> {
    const url = `api/customers_moip/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const cust = resp.json();
        return cust as Customer;
      }),
      catchError(this.handleError)
    );
  }

  public createMoipCustomer(customer: Customer): Observable<Customer> {
    return this.http.post(this.apiMoipServiceUrl, customer).pipe(
      map((resp: Response) => {
        const cust = resp.json();
        return cust as Customer;
      }),
      catchError(this.handleError)
    );
  }

  public deleteMoipCustomer(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url).pipe(
      map((resp: Response) => {
        const cust = resp.json();
        return cust as Customer;
      }),
      catchError(this.handleError)
    );
  }

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
