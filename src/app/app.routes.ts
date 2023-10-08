import { Routes } from '@angular/router';
import { IsLoginGuard } from './_guard/login.guard';
import { IsAdminGuard } from './_guard/admin.guard';
import { IsTutorGuard } from './_guard/tutor.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tutor-perfil',
    loadComponent: () => import('./tutor-perfil/tutor-perfil.page').then( m => m.TutorPerfilPage),
    canActivate: [IsLoginGuard, IsTutorGuard]
  },
  {
    path: 'admin-perfil',
    loadComponent: () => import('./admin-perfil/admin-perfil.page').then( m => m.AdminPerfilPage),
    canActivate: [IsLoginGuard, IsAdminGuard]
  }
];
