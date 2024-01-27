import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupaTagow, NewGrupaTagow } from '../grupa-tagow.model';

export type PartialUpdateGrupaTagow = Partial<IGrupaTagow> & Pick<IGrupaTagow, 'id'>;

export type EntityResponseType = HttpResponse<IGrupaTagow>;
export type EntityArrayResponseType = HttpResponse<IGrupaTagow[]>;

@Injectable({ providedIn: 'root' })
export class GrupaTagowService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupa-tagows');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupaTagow: NewGrupaTagow): Observable<EntityResponseType> {
    return this.http.post<IGrupaTagow>(this.resourceUrl, grupaTagow, { observe: 'response' });
  }

  update(grupaTagow: IGrupaTagow): Observable<EntityResponseType> {
    return this.http.put<IGrupaTagow>(`${this.resourceUrl}/${this.getGrupaTagowIdentifier(grupaTagow)}`, grupaTagow, {
      observe: 'response',
    });
  }

  partialUpdate(grupaTagow: PartialUpdateGrupaTagow): Observable<EntityResponseType> {
    return this.http.patch<IGrupaTagow>(`${this.resourceUrl}/${this.getGrupaTagowIdentifier(grupaTagow)}`, grupaTagow, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupaTagow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupaTagow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupaTagowIdentifier(grupaTagow: Pick<IGrupaTagow, 'id'>): number {
    return grupaTagow.id;
  }

  compareGrupaTagow(o1: Pick<IGrupaTagow, 'id'> | null, o2: Pick<IGrupaTagow, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupaTagowIdentifier(o1) === this.getGrupaTagowIdentifier(o2) : o1 === o2;
  }

  addGrupaTagowToCollectionIfMissing<Type extends Pick<IGrupaTagow, 'id'>>(
    grupaTagowCollection: Type[],
    ...grupaTagowsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupaTagows: Type[] = grupaTagowsToCheck.filter(isPresent);
    if (grupaTagows.length > 0) {
      const grupaTagowCollectionIdentifiers = grupaTagowCollection.map(grupaTagowItem => this.getGrupaTagowIdentifier(grupaTagowItem)!);
      const grupaTagowsToAdd = grupaTagows.filter(grupaTagowItem => {
        const grupaTagowIdentifier = this.getGrupaTagowIdentifier(grupaTagowItem);
        if (grupaTagowCollectionIdentifiers.includes(grupaTagowIdentifier)) {
          return false;
        }
        grupaTagowCollectionIdentifiers.push(grupaTagowIdentifier);
        return true;
      });
      return [...grupaTagowsToAdd, ...grupaTagowCollection];
    }
    return grupaTagowCollection;
  }
}
