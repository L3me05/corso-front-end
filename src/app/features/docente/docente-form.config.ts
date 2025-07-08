import {ButtonForm} from '../../shared/components/dynamic-form/dynamic-form';
import {FieldConfig} from '../../shared/model/field-config.model';
import {Validators} from '@angular/forms';

const cssLabel = 'text-lg font-bold ';
const cssInput = 'input input-bordered w-full rounded-xl px-6 text-sky-800/70 ';
const formCss = 'flex flex-col gap-8 p-4 ';
const globalCss = 'flex flex-col gap-4 ';

export const DOCENTE_BUTTON: ButtonForm = {
  css: 'btn bg-none bg-sky-800 text-white text-lg rounded-xl px-8 py-6 w-fit font-bold text-lg',
  label: 'Invia'
};

export const DOCENTE_FIELDS: FieldConfig[] = [
  {
    name: 'nome',
    type: 'text',
    label: 'Inserisci il tuo nome',
    cssLabel: cssLabel,
    placeholder: 'Nome',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'cognome',
    type: 'text',
    label: 'Inserisci il tuo cognome',
    cssLabel: cssLabel,
    placeholder: 'Cognome',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'dataNascita',
    type: 'date',
    label: 'Inserisci la tua data di nascita',
    cssLabel: cssLabel,
    placeholder: 'Data di nascita',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  }
];

export const DOCENTE_FORM_CSS = formCss;
