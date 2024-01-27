import { IOgloszenie } from 'app/entities/ogloszenie/ogloszenie.model';

export interface ISeniority {
  id: number;
  nazwa?: string | null;
  ogloszenie?: IOgloszenie | null;
}

export type NewSeniority = Omit<ISeniority, 'id'> & { id: null };
