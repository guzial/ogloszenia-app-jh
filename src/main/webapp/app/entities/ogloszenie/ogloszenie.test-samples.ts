import dayjs from 'dayjs/esm';

import { IOgloszenie, NewOgloszenie } from './ogloszenie.model';

export const sampleWithRequiredData: IOgloszenie = {
  id: 7146,
};

export const sampleWithPartialData: IOgloszenie = {
  id: 10372,
  tytul: 'of snooper especially',
  opis: 'next off upright',
  dataPublikacji: dayjs('2024-01-27T09:03'),
  startOd: dayjs('2024-01-26T22:56'),
  czyWidelki: true,
  aktywne: true,
};

export const sampleWithFullData: IOgloszenie = {
  id: 4118,
  tytul: 'atop cultivar',
  opis: 'recklessly that encase',
  dataPublikacji: dayjs('2024-01-27T14:31'),
  dataWaznosci: dayjs('2024-01-27T16:25'),
  startOd: dayjs('2024-01-27T04:28'),
  czyWidelki: false,
  widelkiMin: 16334.9,
  widelkiMax: 23762.13,
  aktywne: true,
};

export const sampleWithNewData: NewOgloszenie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
