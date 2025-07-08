import {Component, inject, OnInit, signal} from '@angular/core';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DISCENTE_BUTTON, DISCENTE_FIELDS, DISCENTE_FORM_CSS} from '../discente-form.config';
import {Discente} from '../../../shared/model/Discente';
import {DiscenteService} from '../../../core/services/discente.service';

@Component({
  selector: 'app-edit-discente',
  standalone: true,
  imports: [
    DynamicForm,
    RouterLink
  ],
  templateUrl: './edit-discente.html',
  styleUrl: './edit-discente.css'
})
export default class EditDiscente implements OnInit{

  formCss = DISCENTE_FORM_CSS;
  fields = DISCENTE_FIELDS;
  button = DISCENTE_BUTTON;

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private discenteService = inject(DiscenteService)
  discente = signal<Discente | undefined>(undefined);
  formData = signal<Discente | undefined>(undefined);


  ngOnInit() {
    this.route.params.subscribe( params => {
      const id = params['id'];
      this.discenteService.getDiscenteById(id).subscribe({
        next: res => {
          this.discente.set(res)
          this.formData.set(res)
        },
        error: err => {
          console.error('Errore nel caricamento del discente', err);
          this.router.navigateByUrl('/discente');
        }
      });
    });
  }

  update(formValue: Discente) {
    if(!this.discente()) {
      console.error('Nessun discente da aggiornare');
      return;
    }

    const discenteId = this.discente()?.id;
    if(!discenteId) {
      console.error('Id discente mancante');
      return;
    }

    this.discenteService.updateDiscente(discenteId, formValue).subscribe({
      next: res => {
        console.log('Discente aggiornato con successo', res);
        this.router.navigateByUrl('/discente');
      },
      error: err => {
        console.error('Errore durante l\'aggiornamento del discente', err);
        alert('Errore durante l\'aggiornamento del discente');
      }
    });

  }

}
