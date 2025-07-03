import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {info} from 'sass';
import {VariantIcon} from './variant-icon';

@Component({
  selector: 'app-alert',
  imports: [
    NgClass,
    VariantIcon
  ],
  template: `
    <div
      role="alert"
      class="alert alert-vertical sm:alert-horizontal"
      [ngClass]="{
      'alert-info': variant === 'info',
      'alert-success': variant === 'success',
      'alert-error': variant === 'error',
      'alert-warning': variant === 'warning'
      }"
    >
      <app-variant-icon [variant]="variant" />
      <div><ng-content /></div>
      @if (buttonsPresent) {
        <div>
          <button class="btn btn-sm" (click)="onCancel.emit()">{{ denyLabel }}</button>
          <button
            class="btn btn-sm btn-primary"
            (click)="onConfirm.emit()"
            [ngClass]="{
            'btn-info': variant === 'info',
            'btn-success': variant === 'success',
            'btn-error': variant === 'error',
            'btn-warning': variant === 'warning'
          }"
          >
            {{ acceptLabel }}
          </button>
        </div>
      }

    </div>
  `,
  styles: ``
})
export class Alert {
  @Output() onCancel = new EventEmitter()
  @Output() onConfirm = new EventEmitter()
  @Input() denyLabel = 'no'
  @Input() acceptLabel = 'yes'
  @Input() variant: 'info' | 'success' | 'error' | 'warning' | undefined;
  @Input({transform: booleanAttribute}) buttonsPresent = false;
  protected readonly info = info;
}
