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
    // Tratamento de problemas com usuarios sem Company associada!
    let user_role = null;
    try {
      user_role = this.current_user.Company.Role.SubscriptionType;
    } catch (e) {
      if (e.name === 'TypeError') {
        this.router.navigate(['/portal/signup/company']);
      }
    }
    // Fim do tratamento de problemas com usuarios sem Company associada!

    if (this.authService.isSignedIn() && user_role !== 'user_not_activated_yet') {
      return true;
    } else {
      if (user_role === 'user_not_activated_yet') {
        // Ir para pagina de aviso de cadastro incompleto.
        this.tokenService.signOut().subscribe(
          () => {
            const okay = confirm('Seu usuario não foi finalizado ainda! - Por favor recarregue a pagina');
          },
          () => alert('Erro!! auth.guard - Usuario nao foi desconectado!')
        );
      } else {
        // this.authService.redirectUrl = url;
        this.tokenService.signOut().subscribe(
          () => alert('Você foi desconectado! - Por favor recarregue a pagina'),
          () => alert('Erro!! auth.guard - Usuario nao foi desconectado!')
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
