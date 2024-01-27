import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWystawca, NewWystawca } from '../wystawca.model';

export type PartialUpdateWystawca = Partial<IWystawca> & Pick<IWystawca, 'id'>;

export type EntityResponseType = HttpResponse<IWystawca>;
export type EntityArrayResponseType = HttpResponse<IWystawca[]>;

@Injectable({ providedIn: 'root' })
export class WystawcaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/wystawcas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(wystawca: NewWystawca): Observable<EntityResponseType> {
    return this.http.post<IWystawca>(this.resourceUrl, wystawca, { observe: 'response' });
  }

  update(wystawca: IWystawca): Observable<EntityResponseType> {
    return this.http.put<IWystawca>(`${this.resourceUrl}/${this.getWystawcaIdentifier(wystawca)}`, wystawca, { observe: 'response' });
  }

  partialUpdate(wystawca: PartialUpdateWystawca): Observable<EntityResponseType> {
    return this.http.patch<IWystawca>(`${this.resourceUrl}/${this.getWystawcaIdentifier(wystawca)}`, wystawca, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWystawca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWystawca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWystawcaIdentifier(wystawca: Pick<IWystawca, 'id'>): number {
    return wystawca.id;
  }

  compareWystawca(o1: Pick<IWystawca, 'id'> | null, o2: Pick<IWystawca, 'id'> | null): boolean {
    return o1 && o2 ? this.getWystawcaIdentifier(o1) === this.getWystawcaIdentifier(o2) : o1 === o2;
  }

  addWystawcaToCollectionIfMissing<Type extends Pick<IWystawca, 'id'>>(
    wystawcaCollection: Type[],
    ...wystawcasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const wystawcas: Type[] = wystawcasToCheck.filter(isPresent);
    if (wystawcas.length > 0) {
      const wystawcaCollectionIdentifiers = wystawcaCollection.map(wystawcaItem => this.getWystawcaIdentifier(wystawcaItem)!);
      const wystawcasToAdd = wystawcas.filter(wystawcaItem => {
        const wystawcaIdentifier = this.getWystawcaIdentifier(wystawcaItem);
        if (wystawcaCollectionIdentifiers.includes(wystawcaIdentifier)) {
          return false;
        }
        wystawcaCollectionIdentifiers.push(wystawcaIdentifier);
        return true;
      });
      return [...wystawcasToAdd, ...wystawcaCollection];
    }
    return wystawcaCollection;
  }
}
