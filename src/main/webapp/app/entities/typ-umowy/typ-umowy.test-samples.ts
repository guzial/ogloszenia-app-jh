import { ITypUmowy, NewTypUmowy } from './typ-umowy.model';

export const sampleWithRequiredData: ITypUmowy = {
  id: 11256,
};

export const sampleWithPartialData: ITypUmowy = {
  id: 26003,
  tekst: 'drat',
};

export const sampleWithFullData: ITypUmowy = {
  id: 29137,
  tekst: 'meanwhile',
};

export const sampleWithNewData: NewTypUmowy = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
