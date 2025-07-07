import {Component, inject} from '@angular/core';
import {ButtonForm, DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {FieldConfig} from '../../../shared/model/field-config.model';
import {Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {DocenteService} from '../../../core/services/docente.service';
import {DOCENTE_BUTTON, DOCENTE_FIELDS, DOCENTE_FORM_CSS} from '../docente-form.config';

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

  fields = DOCENTE_FIELDS;
  button = DOCENTE_BUTTON;
  formCss = DOCENTE_FORM_CSS;


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
