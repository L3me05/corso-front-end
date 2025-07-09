import {Component, inject, OnInit} from '@angular/core';

import {DynamicForm} from '../../../shared/components/dynamic-form/dynamic-form';
import {Router, RouterLink} from '@angular/router';
import {Corso} from '../../../shared/model/Corso';
import {DiscenteService} from '../../../core/services/discente.service';
import {CorsoService} from '../../../core/services/corso.service';
import {combineLatest} from 'rxjs';
import {CorsoForm} from '../corso-form/corso-form';

@Component({
  selector: 'app-create-corso',
  imports: [
    DynamicForm,
    RouterLink,
    CorsoForm
  ],
  templateUrl: './create-corso.html',
  styleUrl: './create-corso.css'
})
export default class CreateCorso{



}

