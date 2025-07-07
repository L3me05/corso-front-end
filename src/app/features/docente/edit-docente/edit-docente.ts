import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { DocenteService } from '../../../core/services/docente.service';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {DOCENTE_FIELDS, DOCENTE_BUTTON, DOCENTE_FORM_CSS} from '../docente-form.config';
import {Docente} from '../../../shared/model/Docente';
import {switchMap} from "rxjs";


@Component({
  selector: 'app-edit-docente',
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './edit-docente.html',
  styleUrl: './edit-docente.css'
})
export default class EditDocente implements OnInit {
  private route = inject(ActivatedRoute);
  private docenteService = inject(DocenteService);
  router = inject(Router);

  docente = signal<Docente | undefined>(undefined);
  fields = DOCENTE_FIELDS;
  button = DOCENTE_BUTTON;
  formCss = DOCENTE_FORM_CSS;
  formData = signal<any>({});


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.docenteService.getDocenteById(id).subscribe({
        next: (docente) => {
          this.docente.set(docente);

        const formattedData = {
          ...docente,
          dataNascita: this.formatDate(docente.dataNascita)
        };

        // Log per debug
        console.log('Data originale:', docente.dataNascita);
        console.log('Data formattata:', formattedData.dataNascita);

        this.formData.set(formattedData);
      },
      error: (err) => {
        console.error('Errore nel caricamento del docente', err);
        this.router.navigateByUrl('/docente');
      }
    });
  });
}

private formatDate(dateString: string | null): string {
  if (!dateString) return '';

  try {
    // Gestisce il formato "DD/MM/YY, HH:mm"
    const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{2})/);
    if (match) {
      const [_, day, month, year] = match;
      // Assumiamo che gli anni '00' siano nel 2000
      const fullYear = '20' + year;
      return `${fullYear}-${month}-${day}`;
    }

    return '';
  } catch (error) {
    console.error('Errore nella formattazione della data:', error);
    return '';
  }
}

  update(formValue: any) {
    if (!this.docente()) {
      console.error('Nessun docente da aggiornare');
      return;
    }

    const docenteId = this.docente()?.id;
    if (!docenteId) {
      console.error('ID docente mancante');
      return;
    }

    const docenteDTO: Docente = {
      ...formValue,
      id: docenteId,
      // conversione data formato corretto
      dataNascita: formValue.dataNascita ?
        new Date(formValue.dataNascita)
          .toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }) + ', 00:00' : null
    };

    this.docenteService.updateDocente(docenteId, docenteDTO).subscribe({
      next: (res) => {
        console.log('Docente aggiornato con successo', res);
        this.router.navigateByUrl('/docente');
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento del docente', err);
        alert('Errore durante l\'aggiornamento del docente');
      }
    });
  }

}
