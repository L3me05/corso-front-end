import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {FieldConfig} from '../../model/field-config.model';
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
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css'
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
