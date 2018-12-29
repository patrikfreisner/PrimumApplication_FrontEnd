import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Clientserviceorder} from '../../Models/clientserviceorder';
import {Angular2TokenService} from 'angular2-token';
import {Response} from '@angular/http';
import {Clientcust} from '../../Models/clientcust.model';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceorderService {

  apiMoipServiceUrl = 'api/clientserviceorders';

  constructor(private http: Angular2TokenService) {
  }

  public getServiceOrder(page): Observable<Clientserviceorder[]> {
    return this.http.get(this.apiMoipServiceUrl + '?q=' + page).pipe(
      map((resp: Response) => {
        const collection: Array<any> = resp.json();
        const serviceOrderCollection: Clientserviceorder[] = [];

        collection.forEach(item => {
          serviceOrderCollection.push(item as Clientserviceorder);
        });

        return serviceOrderCollection;
      }),
      catchError(this.handleError)
    );
  }

  public getServiceOrderById(id: number): Observable<Clientserviceorder> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const cust = resp.json();
        return cust as Clientserviceorder;
      }),
      catchError(this.handleError)
    );
  }

  public createServiceOrder(so: Clientserviceorder): Observable<Clientserviceorder> {
    return this.http.post(this.apiMoipServiceUrl, so).pipe(
      tap((c: any) => console.log('createdCustomer')),
      catchError(this.handleError)
    );
  }

  public updateServiceOrder(so: Clientserviceorder): Observable<Clientserviceorder> {
    return this.http.put(`${this.apiMoipServiceUrl}/${so.id}`, so).pipe(
      tap((c: any) => console.log('updateCustomer')),
      catchError(this.handleError)
    );
  }

  public deleteServiceOrder(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError() {
    return throwError('Um erro ocorreu!');
  }
}
