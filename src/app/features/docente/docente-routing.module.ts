import {RouterModule, Routes} from '@angular/router';
import ListDocente from './list-docente';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', loadComponent: () => import('./list-docente')},
  {path: 'create', loadComponent: () => import('./create-docente')}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DocenteRoutingModule {
}
