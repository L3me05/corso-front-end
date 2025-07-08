import {Component, inject, OnInit} from '@angular/core';
import {Docente} from '../../../shared/model/Docente';
import {DocenteService} from '../../../core/services/docente.service';
import {FieldConfig} from '../../../shared/model/field-config.model';
import {CORSO_BUTTON, CORSO_FIELDS, CORSO_FORM_CSS} from '../corso-form.config';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {Router, RouterLink} from '@angular/router';
import {Corso} from '../../../shared/model/Corso';
import {DiscenteService} from '../../../core/services/discente.service';
import {CorsoService} from '../../../core/services/corso.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-create-corso',
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './create-corso.html',
  styleUrl: './create-corso.css'
})
export default class CreateCorso implements OnInit{

  docenteService = inject(DocenteService);
  discentiService = inject(DiscenteService);
  corsoService = inject(CorsoService);
  fields: FieldConfig[] = [...CORSO_FIELDS];
  corsoButton = CORSO_BUTTON;
  formCss = CORSO_FORM_CSS;
  router = inject(Router);

  ngOnInit() {
    this.docenteService.getDocente().subscribe({
      next: docenti => {
        const docenteField = this.fields.find(f => f.name === 'docente');
        if(docenteField) {
          docenteField.option = docenti.map(d => ({
            label: `${d.nome} ${d.cognome}`,
            value: d.id
          }));
        }

      },
      error: err => {
        console.error('Errore nel recupero dei docenti', err);
      }
    });

    this.discentiService.getDiscente().subscribe({
      next: discenti => {
        const discentiField = this.fields.find(f => f.name === 'discenti');
        if(discentiField) {
          discentiField.option = discenti.map(d => ({
            label: `${d.nome} ${d.cognome}`,
            value: d.id
          }));
        }
      },
      error: err => {
        console.error('Errore nel recupero dei discenti')
      }
    });
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

      this.corsoService.createCorso(corsoPayload as Corso).subscribe({
        next: res => {
          console.log('Corso creato con successo', res);
          this.router.navigateByUrl('/corso');
        },
        error: err => {
          console.error('Errore nella creazione del corso', err);
        }
      });
    });
  }


}

