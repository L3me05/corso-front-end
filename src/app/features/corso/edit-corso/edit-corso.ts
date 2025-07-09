import {Component, inject, OnInit, signal} from '@angular/core';
import {Card} from '../../../shared/components/card';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {CorsoForm} from '../corso-form/corso-form';
import {Corso} from '../../../shared/model/Corso';
import {CorsoService} from '../../../core/services/corso.service';

@Component({
  selector: 'app-edit-corso',
  imports: [
    Card,
    RouterLink,
    DynamicForm,
    CorsoForm
  ],
  templateUrl: './edit-corso.html',
  styleUrl: './edit-corso.css'
})
export default class EditCorso implements OnInit{

  formData = signal<Corso | undefined>(undefined);
  router = inject(Router);
  route = inject(ActivatedRoute);
  corsoService = inject(CorsoService);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Questo è l\'id del corso ', id )
      this.corsoService.getCorsoById(id).subscribe({
        next: res => this.formData.set(res),
        error: err => console.error('Errore nel caricamento del corso', err)
      })
    })
  }
}
