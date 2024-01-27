import { IOgloszenie } from 'app/entities/ogloszenie/ogloszenie.model';

export interface IWystawca {
  id: number;
  nazwa?: string | null;
  kontakt?: string | null;
  ogloszenias?: IOgloszenie[] | null;
}

export type NewWystawca = Omit<IWystawca, 'id'> & { id: null };
