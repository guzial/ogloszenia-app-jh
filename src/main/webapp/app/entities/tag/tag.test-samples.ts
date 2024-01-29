import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 23391,
};

export const sampleWithPartialData: ITag = {
  id: 768,
  tekst: 'around following',
};

export const sampleWithFullData: ITag = {
  id: 19353,
  tekst: 'cheerfully er close',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
