import { Routes } from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';
import {authLoggedGuard} from './core/auth/auth-logged-guard';

export const routes: Routes = [
  {
    path:'corso',
    loadComponent: () => import('./features/corso/corso'),
    canActivate:[authLoggedGuard]
  },
  {
    path: 'discente',
    loadComponent: () => import('./features/discente/discente'),
    canActivate:[authLoggedGuard]
  },
  {
    path: 'docente',
    loadChildren: () => import('./features/docente/docente.module'),
    canActivate:[authLoggedGuard]
  },
  { path: 'home', loadComponent: () => import('./features/home/home')},
  {
    path: 'login',
    loadComponent: () => import('./features/login/login'),
    canActivate:[AuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/signup/signup'),
    canActivate:[AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];
