import {Injectable} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Observable, throwError} from 'rxjs';
import {Order} from '../../Models/order.model';
import {catchError, map} from 'rxjs/operators';
import {Response} from '@angular/http';
import {User} from '../../../Models/user.model';
import {Company} from '../../../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  apiMoipServiceUrl = 'api/companies';

  constructor(private http: Angular2TokenService) {
  }

  public getUsersWithoutCompany(): Observable<User[]> {
    return this.http.get('api/user_without_company').pipe(
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

  public getUserById(id: number): Observable<User> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const user = resp.json();
        return user as User;
      }),
      catchError(this.handleError)
    );
  }

  public createCompany(company: Company): Observable<Company> {
    return this.http.post(this.apiMoipServiceUrl, company).pipe(
      map((resp: Response) => {
        const company1 = resp.json();
        return company1 as Company;
      }),
      catchError(this.handleError)
    );
  }

  public deleteMoipOrder(id: number): Observable<{}> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
