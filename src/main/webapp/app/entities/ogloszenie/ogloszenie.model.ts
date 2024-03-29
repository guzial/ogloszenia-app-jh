import dayjs from 'dayjs/esm';
import { ISeniority } from 'app/entities/seniority/seniority.model';
import { ITypUmowy } from 'app/entities/typ-umowy/typ-umowy.model';
import { IWystawca } from 'app/entities/wystawca/wystawca.model';
import { ITag } from 'app/entities/tag/tag.model';

export interface IOgloszenie {
  id: number;
  tytul?: string | null;
  opis?: string | null;
  dataPublikacji?: dayjs.Dayjs | null;
  dataWaznosci?: dayjs.Dayjs | null;
  startOd?: dayjs.Dayjs | null;
  czyWidelki?: boolean | null;
  widelkiMin?: number | null;
  widelkiMax?: number | null;
  aktywne?: boolean | null;
  seniority?: ISeniority | null;
  typUmowy?: ITypUmowy | null;
  wystawca?: IWystawca | null;
  tags?: ITag[] | null;
}

export type NewOgloszenie = Omit<IOgloszenie, 'id'> & { id: null };
