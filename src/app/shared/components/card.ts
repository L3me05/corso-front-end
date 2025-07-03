import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  template: `
    <div
      class="card"
      [ngClass]="cardClass"
    >
      <div class="card-body">
        <h2 class="card-title">{{ title }}</h2>
        <p>
          <ng-content />
        </p>
        <div class="card-actions justify-end">
          <button
            class="btn"
            (click)="action.emit()"
            [ngClass]="{
              'btn-info': variant === 'info',
              'btn-success': variant === 'success',
              'btn-error': variant === 'error',
              'btn-warning': variant === 'warning'
            }"
          >
            {{ label }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Card {
  @Output() action = new EventEmitter();
  @Input() label = 'click';
  @Input() title: string= '';
  @Input() variant: 'info' | 'success' | 'error' | 'warning' | undefined;
  @Input() cardClass: string = 'bg-primary text-primary-content w-96'

}
