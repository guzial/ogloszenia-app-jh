import { ISeniority, NewSeniority } from './seniority.model';

export const sampleWithRequiredData: ISeniority = {
  id: 27148,
};

export const sampleWithPartialData: ISeniority = {
  id: 3103,
  nazwa: 'deeply kiddingly',
};

export const sampleWithFullData: ISeniority = {
  id: 9431,
  nazwa: 'superb striking',
};

export const sampleWithNewData: NewSeniority = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
