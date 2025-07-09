import {Component, inject, Input, OnInit} from '@angular/core';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {Router, RouterLink} from '@angular/router';
import {DocenteService} from '../../../core/services/docente.service';
import {DiscenteService} from '../../../core/services/discente.service';
import {CorsoService} from '../../../core/services/corso.service';
import {FieldConfig} from '../../../shared/model/field-config.model';
import {CORSO_BUTTON, CORSO_FIELDS, CORSO_FORM_CSS} from '../corso-form.config';
import {Corso} from '../../../shared/model/Corso';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-corso-form',
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './corso-form.html',
  styleUrl: './corso-form.css'
})
export class CorsoForm implements OnInit{
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initial?: Corso;

  docenteService = inject(DocenteService);
  discentiService = inject(DiscenteService);
  corsoService = inject(CorsoService);
  fields: FieldConfig[] = [...CORSO_FIELDS];
  corsoButton = CORSO_BUTTON;
  formCss = CORSO_FORM_CSS;
  router = inject(Router);

  ngOnInit() {
    this.docenteService.getDocente().subscribe({
      next: docenti => this.setOptions('docente', docenti),
      error: err => {
        console.error('Errore nel recupero dei docenti', err);
      }
    });

    this.discentiService.getDiscente().subscribe({
      next: discenti => this.setOptions('discenti', discenti),
      error: err => {
        console.error('Errore nel recupero dei discenti')
      }
    });
  }

  private setOptions(fieldName: string, list: any[]) {
    const f = this.fields.find(x => x.name === fieldName);
    if (f) {
      f.option = list.map(d => ({ label: `${d.nome} ${d.cognome}`, value: d.id }));
      // se edit mode e dati iniziali, patcha
      if (this.mode === 'edit' && this.initial) {
        // qui puoi usare un metodo del DynamicForm per patchare i valori
      }
    }
  }


  save(item: Corso) {
    combineLatest([
      this.docenteService.getDocente(),
      this.discentiService.getDiscente()
    ]).subscribe(([docenti, discenti]) => {
      console.log(item.docente)
      const docenteId = typeof item.docente === 'object' ? item.docente.id : item.docente;
      const docenteCompleto = docenti.find(d => String(d.id) === String(docenteId));

      if (!docenteCompleto) {
        console.error('Docente non trovato');
        return;
      }

      const discentiCompleti = item.discenti && Array.isArray(item.discenti)
        ? discenti.filter(d =>
          item.discenti.some(discente => {
            const discenteId = typeof discente === 'object' ? discente.id : discente;
            return String(d.id) === String(discenteId);
          })
        )
        : [];

      const corsoPayload = {
        nome: item.nome,
        annoAccademico: item.annoAccademico,
        docente: docenteCompleto,
        discenti: discentiCompleti
      };

      if (this.mode === 'create') {
        this.corsoService.createCorso(corsoPayload as Corso).subscribe({
          next: res => {
            console.log('Corso creato con successo', res);
            this.router.navigateByUrl('/corso');
          },
          error: err => {
            console.error('Errore nella creazione del corso', err);
          }
        });
      } else {
        this.corsoService.updateCorso(1 ,corsoPayload as Corso).subscribe({
          next: res => {
            console.log('Corso aggiornato con successo', res);
            this.router.navigateByUrl('/corso');
          },
          error: err => {
            console.error('Errore nell\'aggiornamento del corso', err);
          }
        });
      }
    });
  }
}
