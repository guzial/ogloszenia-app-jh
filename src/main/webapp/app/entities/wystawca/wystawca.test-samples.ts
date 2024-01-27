import { IWystawca, NewWystawca } from './wystawca.model';

export const sampleWithRequiredData: IWystawca = {
  id: 28506,
};

export const sampleWithPartialData: IWystawca = {
  id: 11005,
  nazwa: 'instead',
};

export const sampleWithFullData: IWystawca = {
  id: 2889,
  nazwa: 'fondly aha',
  kontakt: 'mmm anniversary',
};

export const sampleWithNewData: NewWystawca = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
