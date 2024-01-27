import { ITag } from 'app/entities/tag/tag.model';

export interface IGrupaTagow {
  id: number;
  nazwaGrupy?: string | null;
  tag?: ITag | null;
}

export type NewGrupaTagow = Omit<IGrupaTagow, 'id'> & { id: null };
