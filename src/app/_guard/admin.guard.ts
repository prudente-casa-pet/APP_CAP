import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tempoAtual = new Date().getTime();
    const exp = Number(localStorage.getItem('exp'));

    if (tempoAtual > exp){
      localStorage.clear()
    }

    const admin = !!localStorage.getItem('admin');

    if (admin) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
