import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routes = [
  {
    path: '',
    loadComponent: () => import('./list-discente/list-discente')
  },
  {
    path: 'create',
    loadComponent: () => import('./create-discente/create-discente').then(m => m.default)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit-discente/edit-discente').then(m => m.default)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscenteRoutingModule {}
