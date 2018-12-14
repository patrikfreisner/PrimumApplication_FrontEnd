import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Clientserviceorder} from '../../Models/clientserviceorder';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceorderService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  apiMoipServiceUrl = 'http://localhost:3000/api/clientserviceorders';

  constructor(private http: HttpClient) {
  }
  public getServiceOrder(page): Observable<Clientserviceorder[]> {
    return this.http.get<Clientserviceorder[]>(this.apiMoipServiceUrl + '?q=' + page).pipe(
      tap((service_order: Clientserviceorder) => console.log('Loaded Client')),
      catchError(this.handleError<Clientserviceorder>('getMoipCustomers'))
    );
  }

  public getServiceOrderById(id: number): Observable<Clientserviceorder> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get<Clientserviceorder>(url).pipe(
      tap((clientserviceorder) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Clientserviceorder>(`getHero id=${id}`))
    );
  }

  public createServiceOrder(so: Clientserviceorder): Observable<Clientserviceorder> {
    return this.http.post<Clientserviceorder>(this.apiMoipServiceUrl, so, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', so))
      );
  }
  public updateServiceOrder(so: Clientserviceorder): Observable<Clientserviceorder> {
    return this.http.put<Clientserviceorder>(`${this.apiMoipServiceUrl}/${so.id}`, so, this.httpOptions).pipe(
      catchError(this.handleError('error operação put', so))
    );
  }

  public deleteServiceOrder(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteSO'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
}
