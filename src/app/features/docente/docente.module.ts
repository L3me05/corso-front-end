import {CommonModule} from '@angular/common';
import {DocenteRoutingModule} from './docente-routing.module';
import {NgModule} from '@angular/core';
import ListDocente from './list-docente/list-docente';
import CreateDocente from './create-docente/create-docente';
import EditDocente from './edit-docente/edit-docente';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    ListDocente,
    CreateDocente,
    EditDocente
  ]
})

export default class DocenteModule {

}
