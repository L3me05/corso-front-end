import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: '',
    loadComponent: () => import('./list-corso/list-corso')
  },
  {
    path: 'create',
    loadComponent: () => import('./create-corso/create-corso')
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit-corso/edit-corso')
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CorsoRoutingModule {

}
