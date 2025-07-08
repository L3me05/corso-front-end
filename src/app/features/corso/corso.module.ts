import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import ListCorso from './list-corso/list-corso';
import CreateCorso from './create-corso/create-corso';
import EditCorso from './edit-corso/edit-corso';
import {CorsoRoutingModule} from './corso-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CorsoRoutingModule,
    ListCorso,
    CreateCorso,
    EditCorso
  ]
})

export default class CorsoModule {

}
