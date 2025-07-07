import { Component } from '@angular/core';
import {ButtonForm, DynamicForm} from '../../shared/components/dynamic-form';
import {FieldConfig} from '../../shared/model/field-config.model';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-create-docente',
  imports: [
    DynamicForm
  ],
  template: `
    <div class="flex justify-center flex-wrap">
      <app-dynamic-form
        [fields]="fields"
        [formCss]="formCss"
        [button]="button"
      />

    </div>

  `,
  styles: ``
})
export default class CreateDocente {
  cssLabel = 'text-lg font-bold';
  cssInput = 'input input-bordered w-full';
  formCss = 'flex flex-col gap-4 p-4 items-center';
  button : ButtonForm = {
    css: 'btn btn-primary ',
    label: 'Invia'
  }

  fields: FieldConfig[] = [
    {
      name: 'nome',
      type: 'text',
      label: 'Inserisci il tuo nome',
      cssLabel: this.cssLabel,
      placeholder: 'Nome',
      cssInput: this.cssInput,
      validators: [Validators.required]
    },
    {
      name: 'cognome',
      type: 'text',
      label: 'Inserisci il tuo cognome',
      cssLabel: this.cssLabel,
      placeholder: 'Cognome',
      cssInput: this.cssInput,
      validators: [Validators.required]
    },
    {
      name: 'dataNascita',
      type: 'date',
      label: 'Inserisci la tua data di nascita',
      cssLabel: this.cssLabel,
      placeholder: 'Data di nascita',
      cssInput: this.cssInput,
      validators: [ Validators.required ]

    }
  ];

}
