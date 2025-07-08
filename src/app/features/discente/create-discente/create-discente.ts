import {Component, inject} from '@angular/core';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {DISCENTE_BUTTON, DISCENTE_FIELDS, DISCENTE_FORM_CSS} from '../discente-form.config';
import {Router, RouterLink} from '@angular/router';
import {DOCENTE_BUTTON, DOCENTE_FIELDS, DOCENTE_FORM_CSS} from '../../docente/docente-form.config';
import {Discente} from '../../../shared/model/Discente';
import {DiscenteService} from '../../../core/services/discente.service';

@Component({
  selector: 'app-create-discente',
  standalone: true,
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './create-discente.html',
  styleUrl: './create-discente.css'
})
export default class CreateDiscente {
  fields = DISCENTE_FIELDS;
  discenteButton = DISCENTE_BUTTON;
  formCss = DISCENTE_FORM_CSS;

  router = inject(Router)
  discenteService = inject(DiscenteService)

  save(formValue: Discente) {
    this.discenteService.createDiscente(formValue).subscribe({
      next: res => {
        console.log('Discente creato', res);
        this.router.navigateByUrl('/discente');
      },
      error: err => {
        console.log('Errore creazione discente', err)
        alert('Errore creazione discente')
      }
    })
  }
}
