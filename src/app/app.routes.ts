import { Routes } from '@angular/router';

export const routes: Routes = [
  { path:'corso', loadComponent: () => import('./features/corso/corso')},
  { path: 'discente', loadComponent: () => import('./features/discente/discente')},
  { path: 'docente', loadComponent: () => import('./features/docente/docente')},
  { path: 'home', loadComponent: () => import('./features/home/home')},
  { path: 'login', loadComponent: () => import('./features/login/login')},
  { path: 'signup', loadComponent: () => import('./features/signup/signup')},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];
