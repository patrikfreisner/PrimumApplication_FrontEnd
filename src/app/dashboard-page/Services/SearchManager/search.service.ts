import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Clientcust} from '../../Models/clientcust.model';
import {Clientserviceorder} from '../../Models/clientserviceorder';
import {Response} from '@angular/http';
import {Angular2TokenService} from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiSearchServiceUrl = 'api/search';

  constructor(private http: Angular2TokenService) {
  }

  public getClientcustBySearch(object: string, term: string): Observable<Clientcust[]> {
    const url = `${this.apiSearchServiceUrl}Clientcust?q[${object}_cont]=${term}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        if (resp.json() != null) {
          const collection: Array<any> = resp.json();
          const customerCollection: Clientcust[] = [];

          collection.forEach(item => {
            customerCollection.push(item as Clientcust);
          });

          return customerCollection;
        } else {
          const clientcust: Array<Clientcust> = [];
          return clientcust;
        }
      }),
      catchError(this.handleError)
    );
  }

  public getServiceOrderBySearch(object: string, term: string): Observable<Clientserviceorder[]> {
    const url = `${this.apiSearchServiceUrl}So?q[${object}_matches]=${term}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
       if (resp.json() != null) {
          const collection: Array<any> = resp.json();
        const serviceOrderCollection: Clientserviceorder[] = [];

        collection.forEach(item => {
          serviceOrderCollection.push(item as Clientserviceorder);
        });

        return serviceOrderCollection;
       } else {
         const so: Array<Clientserviceorder> = [];
          return so;
       }
      }),
      catchError(this.handleError)
    );
  }


  private handleError() {
    return throwError('Um erro ocorreu na busca!');
  }
}
