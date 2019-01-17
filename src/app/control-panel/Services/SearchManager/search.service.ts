import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Customer} from '../../Models/customer.model';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../Models/order.model';
import {Angular2TokenService} from 'angular2-token';
import {Response} from '@angular/http';
import {Role} from '../../../Models/role.model';
import {User} from '../../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiMoipServiceUrl = 'api/search';

  constructor(private http: Angular2TokenService) {
  }

  public getCustomerBySearch(object: string, term: string): Observable<Customer[]> {
    const url = `${this.apiMoipServiceUrl}Cust?q[${object}_cont]=${term}&q[moip_id_cont]=cus`;
    return this.http.get(url).pipe(
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

  public getOrderBySearch(object: string, term: string): Observable<Order[]> {
    const url = `${this.apiMoipServiceUrl}Order?q[${object}_cont]=${term}`;
    return this.http.get(url).pipe(
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

  public getPaymentBySearch(object: string, term: string): Observable<Order[]> {
    const url = `${this.apiMoipServiceUrl}Payment?q[${object}_cont]=${term}`;
    return this.http.get(url).pipe(
      tap((orders: Order) => {
        return orders;
        console.log('Loaded order');
      }),
      catchError(this.handleError)
    );
  }

  public getRoleBySearch(object: string, term: string): Observable<Role[]> {
    const url = `${this.apiMoipServiceUrl}Role?q[${object}_cont]=${term}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const RoleCollection: Role[] = [];

        collection.forEach(item => {
          RoleCollection.push(item as Role);
        });

        return RoleCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getUserBySearch(object: string, term: string): Observable<User[]> {
    const url = `${this.apiMoipServiceUrl}User?q[${object}_cont]=${term}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const UserCollection: User[] = [];

        collection.forEach(item => {
          UserCollection.push(item as User);
        });

        return UserCollection;
      }),
      catchError(this.handleError)
    );
  }


  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
