import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Angular2TokenService} from 'angular2-token';
import {User} from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: Angular2TokenService
  ) {

  }

  public async getCurrentUserData(): Promise<User> {
    const promise = await new Promise<User>(
      (resolve, reject) => {
        this.tokenService.get('api/current_user_data')
          .toPromise()
          .then(
            (res) => {
              resolve(res.json());
            },
            (res) => {
              this.handleErrorsWithSignout();
              reject(res.json());
            }
          );
      });
    return promise;
  }

  // public getCurrentUserData(): Observable<User> {
  //   return this.tokenService.get('api/current_user_data').pipe(
  //     map(
  //       (res) => {
  //         const data: User = res.json();
  //         return data;
  //       },
  //     ),
  //     catchError(this.handleErrorsWithSignout)
  //   );
  // }

  public signIn(uid: string, password: string): Observable<Response> {
    const signInData = {
      email: uid,
      password: password
    };
    return this.tokenService.signIn(signInData).pipe(
      catchError(this.handleErrors)
    );
  }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any).pipe(
      catchError(this.handleErrors)
    );
  }

  public signOut(): Observable<Response> {
    return this.tokenService.signOut();
  }

  public isSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(res: Response) {
    return throwError(res);
  }

  private handleErrorsWithSignout() {
    this.tokenService.post('auth/sign_out', {}).subscribe(
      () => alert('Você foi desconectado!')
    );
    this.tokenService.signOut();
    return throwError('Error');
  }
}
