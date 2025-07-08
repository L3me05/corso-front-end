import {ValidatorFn} from '@angular/forms';

export type FieldOption = { label: string; value: any };

export interface FieldConfig {
  name: string;
  type: 'text'|'email'|'number'|'date'|'textarea'|'checkbox' | 'select';
  cssCheck?: string;
  label?: string;
  cssLabel?: string;
  placeholder?: string;
  option?: FieldOption[];
  validators?: ValidatorFn[];
  cssInput?: string;
  globalCss?: string;
}
