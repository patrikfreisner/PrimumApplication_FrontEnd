import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Clientcust} from '../../Models/clientcust.model';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Angular2TokenService} from 'angular2-token';
import {Response} from '@angular/http';

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

  apiMoipServiceUrl = 'api/clientcusts';

  constructor(private http: Angular2TokenService) {
  }

  public getCustomers(page): Observable<Clientcust[]> {
    return this.http.get(this.apiMoipServiceUrl + '?q=' + page).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const customerCollection: Clientcust[] = [];

        collection.forEach(item => {
          customerCollection.push(item as Clientcust);
        });

        return customerCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getCustomerById(id: number): Observable<Clientcust> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const cust = resp.json();

        return cust as Clientcust;
      }),
      catchError(this.handleError)
    );
  }

  public createCustomer(customer: Clientcust): Observable<Clientcust> {
    return this.http.post(this.apiMoipServiceUrl, customer).pipe(
      tap((c: any) => console.log('createCustomer')),
      catchError(this.handleError)
    );
  }

  public updateCustomer(customer: Clientcust): Observable<Clientcust> {
    return this.http.put(`${this.apiMoipServiceUrl}/${customer.id}`, customer).pipe(
      tap((c: any) => console.log('updateCustomer')),
      catchError(this.handleError)
    );
  }

  public deleteCustomer(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    return throwError('Um erro ocorreu!');
  }
}
