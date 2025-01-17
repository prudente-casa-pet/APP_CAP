import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tempoAtual = new Date().getTime();
    const exp = Number(localStorage.getItem('exp'));

    // Se a sessão já expirou, apaga localStorage
    if (tempoAtual > exp){
      localStorage.clear()
    }

    const loggedIn = !!localStorage.getItem('token');
    
    // Verifica se a sessão esta logada
    if (loggedIn ) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
