import {CommonModule} from '@angular/common';
import {DocenteRoutingModule} from './docente-routing.module';
import {NgModule} from '@angular/core';
import ListDocente from './list-docente/list-docente';
import CreateDocente from './create-docente/create-docente';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    ListDocente,
    CreateDocente
  ]
})

export default class DocenteModule {

}
