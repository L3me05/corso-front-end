import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {FieldConfig} from '../model/field-config.model';
import {CommonModule, NgClass} from '@angular/common';

export type ButtonForm = {
  css: string;
  label: string;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <p>
      dynamic-form works!
    </p>
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      [ngClass]="formCss"
    >

      @for (f of fields; track f.name) {
        <div [ngClass]="f.globalCss">

          @if (f.label) {
            <label
              [ngClass]="f.cssLabel"
            >
              {{f.label}}
            </label>
          }

          @if (['text', 'number', 'email', 'date'].includes(f.type)) {
            <input
              [type]="f.type"
              [formControlName]="f.name"
              [placeholder]="f.placeholder"
              [ngClass]="f.cssInput"
            >
          } @else if (f.type === 'textarea') {
            <textarea
              [formControlName]="f.name"
              [placeholder]="f.placeholder"
              [ngClass]="f.cssInput"
            >
            </textarea>
          } @else if (f.type === 'select') {
            <select
              [formControlName]="f.name"
              [ngClass]="f.cssInput"
            >
              @for (option of f.option; track $index) {
                <option [value]="option.value">
                  {{option.label}}
                </option>
              }
            </select>
          } @else if (f.type === 'checkbox') {
            <label [ngClass]="f.cssCheck">
              <input
                type="checkbox"
                [formControlName]="f.name"
                [ngClass]="f.cssInput"
              >
              <span>{{f.label}}</span>
            </label>
          }

          @if (form.get(f.name)?.touched && form.get(f.name)?.invalid) {
            <p class="text-red-600 text-sm">
              Campo obbligatorio o non valido
            </p>
          }

        </div>
      }
      <button
        type="submit"
        [disabled]="form.invalid"
        [ngClass]="button.css"
      >
        {{button.label}}
      </button>

    </form>
  `,
  styles: ``
})
export class DynamicForm implements OnChanges{
  @Input()
  fields: FieldConfig[] = [];
  @Input() formCss: string = 'flex flex-col gap-4 p-4';
  @Input()
  button: ButtonForm = {
    css: 'btn btn-primary',
    label: 'Invio'
  };
  @Output()
  submitForm = new EventEmitter<any>();

  form!: FormGroup;
  fb = inject(FormBuilder);

  ngOnChanges() {
    const group: Record<string, any> = {};
    this.fields.forEach(f => group[f.name] = ['', f.validators || []]);
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if(this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

}
