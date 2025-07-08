import {FieldConfig} from '../../shared/model/field-config.model';
import {ButtonForm} from '../../shared/components/dynamic-form/dynamic-form';
import {Validators} from '@angular/forms';

const cssLabel = 'text-lg font-bold ';
const cssInput = 'input input-bordered w-full rounded-xl px-6 text-sky-800/70 ';
const formCss = 'flex flex-col gap-8 p-4 ';
const globalCss = 'flex flex-col gap-4 ';

export const DISCENTE_BUTTON: ButtonForm = {
  css: 'btn bg-none bg-sky-800 text-white text-lg rounded-xl px-8 py-6 w-fit font-bold text-lg',
  label: 'Invia'
}

export const DISCENTE_FIELDS: FieldConfig[] = [
  {
    name: 'nome',
    type: 'text',
    label: 'Inserisci il nome',
    cssLabel: cssLabel,
    placeholder: 'Pippo',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'cognome',
    type: 'text',
    label: 'Inserisci il cognome',
    cssLabel: cssLabel,
    placeholder: 'Rossi',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },
  {
    name: 'matricola',
    type: 'number',
    label: 'Inserisci la matricola',
    cssLabel: cssLabel,
    placeholder: '342',
    cssInput: cssInput,
    validators: [Validators.required, Validators.min(0)],
    globalCss: globalCss
  },
  {
    name: 'eta',
    type: 'number',
    label: "Inserisci l'età",
    cssLabel: cssLabel,
    placeholder: '20',
    cssInput: cssInput,
    validators: [Validators.required, Validators.min(0), Validators.max(100)],
    globalCss: globalCss
  },
  {
    name: 'cittaResidenza',
    type: 'text',
    label: 'Inserisci la città di residenza',
    cssLabel: cssLabel,
    placeholder: 'Roma',
    cssInput: cssInput,
    validators: [Validators.required],
    globalCss: globalCss
  },


]

export const DISCENTE_FORM_CSS = formCss;
