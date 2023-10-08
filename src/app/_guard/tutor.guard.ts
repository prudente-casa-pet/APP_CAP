import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsTutorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tempoAtual = new Date().getTime();
    const exp = Number(localStorage.getItem('exp'));

    if (tempoAtual > exp){
      localStorage.clear()
    }

    const tutor = !!localStorage.getItem('tutor');

    if (tutor) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
