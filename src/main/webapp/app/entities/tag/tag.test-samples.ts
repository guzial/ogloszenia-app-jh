import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 28938,
};

export const sampleWithPartialData: ITag = {
  id: 28260,
};

export const sampleWithFullData: ITag = {
  id: 23391,
  tekst: 'rapidly',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
