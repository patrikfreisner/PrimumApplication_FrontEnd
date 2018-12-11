import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Clientcust} from '../../Models/clientcust.model';
import {Clientserviceorder} from '../../Models/clientserviceorder';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiSearchServiceUrl = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) {
  }

  public getClientcustBySearch(object: string, term: string): Observable<Clientcust[]> {
    const url = `${this.apiSearchServiceUrl}Clientcust?q[${object}_cont]=${term}`;
    return this.http.get<Clientcust[]>(url).pipe(
      tap(_ => console.log(`goes object=${object}`)),
      catchError(this.handleError<Clientcust[]>(`getHero id=${object}`))
    );
  }

  public getServiceOrderBySearch(object: string, term: string): Observable<Clientserviceorder[]> {
    const url = `${this.apiSearchServiceUrl}So?q[${object}_matches]=${term}`;
    return this.http.get<Clientserviceorder[]>(url).pipe(
      tap(_ => console.log(`goes object=${object}`)),
      catchError(this.handleError<Clientserviceorder[]>(`getHero id=${object}`))
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
