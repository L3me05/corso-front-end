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
  <div class="flex flex-col w-full items-center justify-center py-5">
    <div class="font-bold text-3xl p-10 text-sky-800">
      Crea un nuovo docente
    </div>

    <div class="w-full items-stretch max-w-md "> <!-- Contenitore aggiuntivo -->
      <app-dynamic-form
        [fields]="fields"
        [formCss]="formCss"
        [button]="button"
        (submitForm)="save($event)"
      />
    </div>
  </div>
`,
  styles: ``
})
export default class CreateDocente {
  cssLabel = 'text-lg font-bold ';
  cssInput = 'input input-bordered w-full rounded-xl px-6 text-sky-800/70 ';
  formCss = 'flex flex-col  gap-8 p-4 ';
  globalCss = 'flex flex-col gap-4 ';
  button : ButtonForm = {
    css: 'btn btn-primary rounded-xl px-8 py-6 w-fit font-bold text-lg',
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
      validators: [Validators.required],
      globalCss: this.globalCss

    },
    {
      name: 'cognome',
      type: 'text',
      label: 'Inserisci il tuo cognome',
      cssLabel: this.cssLabel,
      placeholder: 'Cognome',
      cssInput: this.cssInput,
      validators: [Validators.required],
      globalCss: this.globalCss
    },
    {
      name: 'dataNascita',
      type: 'date',
      label: 'Inserisci la tua data di nascita',
      cssLabel: this.cssLabel,
      placeholder: 'Data di nascita',
      cssInput: this.cssInput,
      validators: [ Validators.required ],
      globalCss: this.globalCss

    }
  ];

  save(formValue: any) {



  }

}
