import {RouterModule, Routes} from '@angular/router';
import ListDocente from './list-docente/list-docente';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', loadComponent: () => import('./list-docente/list-docente')},
  {path: 'create', loadComponent: () => import('./create-docente/create-docente')}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DocenteRoutingModule {
}
