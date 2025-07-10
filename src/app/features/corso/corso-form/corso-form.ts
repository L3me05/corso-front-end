import {
  Component,
  inject,
  input,
  Input,
  InputSignal,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { Router, RouterLink } from '@angular/router';
import { DocenteService } from '../../../core/services/docente.service';
import { DiscenteService } from '../../../core/services/discente.service';
import { CorsoService } from '../../../core/services/corso.service';
import { FieldConfig } from '../../../shared/model/field-config.model';
import {
  CORSO_BUTTON,
  CORSO_FIELDS,
  CORSO_FORM_CSS,
} from '../corso-form.config';
import { Corso } from '../../../shared/model/Corso';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-corso-form',
  imports: [DynamicForm, RouterLink],
  templateUrl: './corso-form.html',
  styleUrl: './corso-form.css',
})
export class CorsoForm implements OnInit, OnChanges {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initial?: Corso;
  // initial: InputSignal<Corso | undefined> = input<Corso | undefined>(undefined);

  // dataLoaded = signal(false);
  formData = signal<Corso | undefined>(undefined);

  docenteService = inject(DocenteService);
  discentiService = inject(DiscenteService);
  corsoService = inject(CorsoService);
  fields: FieldConfig[] = [...CORSO_FIELDS];
  corsoButton = CORSO_BUTTON;
  formCss = CORSO_FORM_CSS;
  router = inject(Router);

  dataLoaded = signal(false);

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initial'] && this.dataLoaded()) {
      this.updateFormData();
    }
  }

  private loadInitialData() {
    combineLatest([
      this.docenteService.getDocente(),
      this.discentiService.getDiscente(),
    ]).subscribe({
      next: ([docenti, discenti]) => {
        this.setOptions('docente', docenti);
        this.setOptions('discenti', discenti);
        this.dataLoaded.set(true);
        this.updateFormData();
      },
      error: (err) => {
        console.error('Errore nel caricamento dei dati', err);
      },
    });
  }

  private updateFormData() {
    if (this.initial) {
      this.formData.set(this.getFormattedInitialValues());
    }
  }

  private setOptions(fieldName: string, list: any[]) {
    const f = this.fields.find((x) => x.name === fieldName);
    if (f) {
      f.option = list.map((d) => ({
        label: `${d.nome} ${d.cognome}`,
        value: d.id,
      }));
    }
  }

  save(item: Corso) {
    combineLatest([
      this.docenteService.getDocente(),
      this.discentiService.getDiscente(),
    ]).subscribe(([docenti, discenti]) => {
      const docenteId =
        typeof item.docente === 'object' ? item.docente.id : item.docente;
      const docenteCompleto = docenti.find(
        (d) => String(d.id) === String(docenteId)
      );

      if (!docenteCompleto) {
        console.error('Docente non trovato');
        return;
      }

      // Gestisci discenti in base al tipo di campo
      let discentiCompleti: any[] = [];
      const discenteField = this.fields.find((f) => f.name === 'discenti');

      if (discenteField?.type === 'checkbox' && discenteField.option) {
        // Per checkbox multiple, raccogli gli ID selezionati
        const discentiSelezionati: number[] = [];
        discenteField.option.forEach((option, index) => {
          if (item[`discenti_${index}` as keyof Corso]) {
            discentiSelezionati.push(option.value);
          }
        });

        discentiCompleti = discenti.filter((d) =>
          discentiSelezionati.includes(d.id)
        );
      } else {
        // Per select multiple o altri tipi
        discentiCompleti =
          item.discenti && Array.isArray(item.discenti)
            ? discenti.filter((d) =>
                item.discenti.some((discente) => {
                  const discenteId =
                    typeof discente === 'object' ? discente.id : discente;
                  return String(d.id) === String(discenteId);
                })
              )
            : [];
      }

      const corsoPayload = {
        nome: item.nome,
        annoAccademico: item.annoAccademico,
        docente: docenteCompleto,
        discenti: discentiCompleti,
      };

      if (this.mode === 'create') {
        this.corsoService.createCorso(corsoPayload as Corso).subscribe({
          next: (res) => {
            console.log('Corso creato con successo', res);
            this.router.navigateByUrl('/corso');
          },
          error: (err) => {
            console.error('Errore nella creazione del corso', err);
          },
        });
      } else if (this.initial?.id) {
        this.corsoService
          .updateCorso(this.initial.id, corsoPayload as Corso)
          .subscribe({
            next: (res) => {
              console.log('Corso aggiornato con successo', res);
              this.router.navigateByUrl('/corso');
            },
            error: (err) => {
              console.error("Errore nell'aggiornamento del corso", err);
            },
          });
      } else {
        console.error('Errore corso-form');
      }
    });
  }

  getFormattedInitialValues(): Corso | undefined {
    if (this.mode === 'edit' && this.initial) {
      const formattedValues: any = {
        nome: this.initial.nome,
        annoAccademico: this.initial.annoAccademico,
      };

      if (this.initial.docente) {
        formattedValues.docente = this.initial.docente.id;
      }

      // Formatta discenti - controlla la configurazione del campo
      if (this.initial.discenti && Array.isArray(this.initial.discenti)) {
        const discenteField = this.fields.find((f) => f.name === 'discenti');

        if (discenteField?.type === 'checkbox' && discenteField.option) {
          // Per checkbox multiple, crea un oggetto con chiavi per ogni opzione
          const discentiIds = this.initial.discenti.map((d) => d.id);
          discenteField.option.forEach((option, index) => {
            formattedValues[`discenti_${index}`] = discentiIds.includes(
              option.value
            );
          });
        } else {
          // Per select multiple o altri tipi
          formattedValues.discenti = this.initial.discenti.map((d) => d.id);
        }
      }
      return formattedValues;
    }
    return undefined;
  }
}
