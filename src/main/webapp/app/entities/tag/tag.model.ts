import { IGrupaTagow } from 'app/entities/grupa-tagow/grupa-tagow.model';
import { IOgloszenie } from 'app/entities/ogloszenie/ogloszenie.model';

export interface ITag {
  id: number;
  tekst?: string | null;
  grupaTagow?: IGrupaTagow | null;
  ogloszenie?: IOgloszenie | null;
}

export type NewTag = Omit<ITag, 'id'> & { id: null };
