import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../Service/auth.service';
import {User} from '../Models/user.model';
import {Angular2TokenService} from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {

  current_user: User;
  have_company: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: Angular2TokenService
  ) {

  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return this.checkLogin().then(
      (res) => {
        return res;
      }
    );
  }

  async checkLogin(): Promise<boolean> {
    // await this.userData();
    try {
      // const user_role = this.current_user.company.role.SubscriptionType;
      if (!this.authService.isSignedIn()) {
        return true;
      } else {
        // this.authService.redirectUrl = url;
        this.router.navigate(['/dash']);
        return false;
      }
    } catch (e) {
      console.log('Deu erro!!!');
      console.log(e);
    }
  }

  async userData(): Promise<void> {
    await this.authService.getCurrentUserData().then(
      (user) => {
        this.current_user = user;
      }
    );
  }

}
