import {ValidatorFn} from '@angular/forms';

export interface FieldConfig {
  name: string;
  type: 'text'|'email'|'number'|'date'|'textarea'|'checkbox' | 'select';
  cssCheck?: string;
  label?: string;
  cssLabel?: string;
  placeholder?: string;
  option?: {label: string; value: any}[];
  validators?: ValidatorFn[];
  cssInput?: string;
  globalCss?: string;
}
