import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../Service/auth.service';
import {User} from '../Models/user.model';
import {Angular2TokenService} from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
    // Tratamento de problemas com usuarios sem company associada!
    let user_role = null;
    try {
      user_role = this.current_user.company.role.SubscriptionType;
    } catch (e) {
      if (e.name === 'TypeError') {
        this.router.navigate(['/portal/signup/company']);
      }
    }
    // Fim do tratamento de problemas com usuarios sem company associada!

    if (this.authService.isSignedIn() && (user_role !== 'user_not_activated_yet' && user_role !== 'user_not_active')) {
      return true;
    } else {
      if (user_role === 'user_not_activated_yet') {
        this.router.navigate(['/portal/signin/waiting']);
      } else {
        // this.authService.redirectUrl = url;
        this.tokenService.signOut().subscribe(
          () => console.log('Você foi desconectado! - Por favor recarregue a pagina'),
          () => console.log('Erro!! auth.guard - Usuario nao foi desconectado!')
        );
        this.router.navigate(['/portal/signin']);
      }
    }
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
