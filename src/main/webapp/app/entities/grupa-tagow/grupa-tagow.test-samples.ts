import { IGrupaTagow, NewGrupaTagow } from './grupa-tagow.model';

export const sampleWithRequiredData: IGrupaTagow = {
  id: 853,
};

export const sampleWithPartialData: IGrupaTagow = {
  id: 26564,
  nazwaGrupy: 'till blah respect',
};

export const sampleWithFullData: IGrupaTagow = {
  id: 26765,
  nazwaGrupy: 'pro',
};

export const sampleWithNewData: NewGrupaTagow = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
