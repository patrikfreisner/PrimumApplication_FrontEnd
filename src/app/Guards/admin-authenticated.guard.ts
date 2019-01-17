import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../Service/auth.service';
import {User} from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatedGuard implements CanActivate {

  current_user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.userData();

    return this.checkLogin().then(
      (res) => {
        return res;
      }
    );
  }

  async checkLogin(): Promise<boolean> {
    const user_role = this.current_user.company.role.SubscriptionType;
    try {
      if (this.authService.isSignedIn() && (user_role === 'ADMIN_PRIMUM')) {
        return true;
      } else {
        // this.authService.redirectUrl = url;
        this.router.navigate(['/dash/cust']);
        return false;
      }
    } catch (e) {
      if (e.name === 'TypeError') {
        this.router.navigate(['/dash/cust']);
        console.log('Err: Não foi possivel autentica-lo como adm-guard' + e.name);
      } else {
        this.router.navigate(['/dash/cust']);
        console.log('Err: Não foi possivel autentica-lo como adm-guard --- ' + e.name);
      }
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
