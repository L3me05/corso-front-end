import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  template: `
    <div
      class="card h-full"
      [ngClass]="cardClass"
    >
      <div class="card-body">
        <h2
          class="card-title"
          [ngClass]="titleStyle"
        >
          {{ title }}
        </h2>
        <p>
          <ng-content />
        </p>
        <div class="card-actions justify-end">
          <button
            class="btn"
            (click)="action.emit()"
            [ngClass]="variant"
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
  @Input() variant: string= '';
  @Input() cardClass: string = 'bg-primary text-primary-content w-96'
  @Input() titleStyle: string = 'text-xl font-bold'

}
