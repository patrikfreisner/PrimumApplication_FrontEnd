import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../Models/user.model';
import {AuthService} from '../Service/auth.service';
import {Angular2TokenService} from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class UnregisteredCompanyGuard implements CanActivate {
  current_user: User;
  have_company: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: Angular2TokenService
  ) {
    this.have_company = false;
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin().then(
      (res) => {
        return res;
      }
    );
  }

  async checkLogin(): Promise<boolean> {
    await this.userData();
    // Tratamento de problemas com usuarios sem Company associada!
    let user_role = null;
    try {
      user_role = this.current_user.Company;
      if (this.authService.isSignedIn() && user_role === undefined) {
        return true;
      } else {
        this.router.navigate(['/portal/signin']);
      }
    } catch (e) {
      if (e.name === 'TypeError') {
        console.log('Erro no try catch company');
        this.router.navigate(['/portal/signin']);
        return false;
      }
    }
    // Fim do tratamento de problemas com usuarios sem Company associada!
  }

  async userData(): Promise<void> {
    await this.authService.getCurrentUserData().then(
      (user) => {
        this.current_user = user;
      },
      (reject) => {
        console.log('Reject');
        this.router.navigate(['/portal/signin']);
      }
    );
  }
}
