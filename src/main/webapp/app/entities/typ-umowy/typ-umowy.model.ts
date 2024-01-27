import { IOgloszenie } from 'app/entities/ogloszenie/ogloszenie.model';

export interface ITypUmowy {
  id: number;
  tekst?: string | null;
  ogloszenie?: IOgloszenie | null;
}

export type NewTypUmowy = Omit<ITypUmowy, 'id'> & { id: null };
