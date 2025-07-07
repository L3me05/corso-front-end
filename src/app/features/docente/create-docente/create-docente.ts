import {Component, inject} from '@angular/core';
import {ButtonForm, DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {FieldConfig} from '../../../shared/model/field-config.model';
import {Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {DocenteService} from '../../../core/services/docente.service';

@Component({
  selector: 'app-create-docente',
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './create-docente.html',
  styleUrl: './create-docente.css'

})
export default class CreateDocente {
  docenteService = inject(DocenteService);
  router = inject(Router);

  cssLabel = 'text-lg font-bold ';
  cssInput = 'input input-bordered w-full rounded-xl px-6 text-sky-800/70 ';
  formCss = 'flex flex-col  gap-8 p-4 ';
  globalCss = 'flex flex-col gap-4 ';
  button : ButtonForm = {
    css: 'btn bg-none bg-sky-300/60 text-white text-lg rounded-xl px-8 py-6 w-fit font-bold text-lg',
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
    this.docenteService.createDocente(formValue).subscribe({
      next: res => {
        console.log('Docente creato', res);
        this.router.navigateByUrl('/docente');
      },
      error: err => {
        console.log('Errore creazione docente', err);
        alert('Errore creazione docente');
      }
    })
  }

}
