import { Injectable } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Observable, throwError} from 'rxjs';
import {User} from '../../../Models/user.model';
import {catchError, map} from 'rxjs/operators';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  apiMoipServiceUrl = 'api/user_management';

  constructor(
    private http: Angular2TokenService
  ) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get(this.apiMoipServiceUrl).pipe(
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

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
