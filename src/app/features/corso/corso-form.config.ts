import {ButtonForm} from '../../shared/components/dynamic-form/dynamic-form';
import {FieldConfig} from '../../shared/model/field-config.model';
import {Validators} from '@angular/forms';

const cssLabel = 'text-lg font-bold ';
const cssInput = 'input input-bordered w-full rounded-xl px-6 text-sky-800/70 ';
const formCss = 'flex flex-col gap-8 p-4 ';
const globalCss = 'flex flex-col gap-4 ';

export const CORSO_BUTTON: ButtonForm = {
  css: 'btn bg-sky-800 text-white text-lg rounded-xl px-8 py-6 w-fit font-bold text-lg',
  label: 'Invia'
}

export const CORSO_FIELDS: FieldConfig[] = [
  {
    name: 'nome',
    type: 'text',
    label: 'Inserisci il nome',
    cssLabel: cssLabel,
    placeholder: 'Java',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'annoAccademico',
    type: 'number',
    label: 'Inserisci l\'anno accademico',
    cssLabel: cssLabel,
    placeholder: '2025',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'docente',
    type: 'select',
    option: [],
    label: 'Scegli il docente',
    cssLabel: cssLabel,
    placeholder: 'Alex',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name:'discenti',
    type: 'checkbox',
    option: [],
    cssCheck: 'flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg cursor-pointer transition-colors',
    label: 'Scegli i discenti che partecipano al corso',
    cssLabel: cssLabel,
    placeholder: 'Pippo',
    cssInput: 'checkbox-primary checkbox-sm',
    validators: [Validators.required],
    globalCss: globalCss
  }




]

export const CORSO_FORM_CSS = formCss;
