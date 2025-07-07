import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscenteRoutingModule} from './discente-routing.module';
import ListDiscente from './list-discente/list-discente';
import CreateDiscente from './create-discente/create-discente';
import EditDiscente from './edit-discente/edit-discente';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    DiscenteRoutingModule,
    ListDiscente,
    CreateDiscente,
    EditDiscente
  ]
})

export default class DiscenteModule {

}
