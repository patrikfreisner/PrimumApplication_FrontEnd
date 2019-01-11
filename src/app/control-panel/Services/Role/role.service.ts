import { Injectable } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Observable, throwError} from 'rxjs';
import {User} from '../../../Models/user.model';
import {catchError, map} from 'rxjs/operators';
import {Response} from '@angular/http';
import {Role} from '../../../Models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiMoipServiceUrl = 'api/roles';

  constructor(
    private http: Angular2TokenService
  ) {
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get(this.apiMoipServiceUrl).pipe(
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

  public getRoleById(id: number): Observable<Role> {
    const url = `${this.apiMoipServiceUrl}/${id}`;
    return this.http.get(url).pipe(
      map((resp: Response) => {
        const user = resp.json();
        return user as Role;
      }),
      catchError(this.handleError)
    );
  }

  private handleError() {
    return throwError('Erro ocorreu ao criar moip');
  }
}
