import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypUmowy, NewTypUmowy } from '../typ-umowy.model';

export type PartialUpdateTypUmowy = Partial<ITypUmowy> & Pick<ITypUmowy, 'id'>;

export type EntityResponseType = HttpResponse<ITypUmowy>;
export type EntityArrayResponseType = HttpResponse<ITypUmowy[]>;

@Injectable({ providedIn: 'root' })
export class TypUmowyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/typ-umowies');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(typUmowy: NewTypUmowy): Observable<EntityResponseType> {
    return this.http.post<ITypUmowy>(this.resourceUrl, typUmowy, { observe: 'response' });
  }

  update(typUmowy: ITypUmowy): Observable<EntityResponseType> {
    return this.http.put<ITypUmowy>(`${this.resourceUrl}/${this.getTypUmowyIdentifier(typUmowy)}`, typUmowy, { observe: 'response' });
  }

  partialUpdate(typUmowy: PartialUpdateTypUmowy): Observable<EntityResponseType> {
    return this.http.patch<ITypUmowy>(`${this.resourceUrl}/${this.getTypUmowyIdentifier(typUmowy)}`, typUmowy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypUmowy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypUmowy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTypUmowyIdentifier(typUmowy: Pick<ITypUmowy, 'id'>): number {
    return typUmowy.id;
  }

  compareTypUmowy(o1: Pick<ITypUmowy, 'id'> | null, o2: Pick<ITypUmowy, 'id'> | null): boolean {
    return o1 && o2 ? this.getTypUmowyIdentifier(o1) === this.getTypUmowyIdentifier(o2) : o1 === o2;
  }

  addTypUmowyToCollectionIfMissing<Type extends Pick<ITypUmowy, 'id'>>(
    typUmowyCollection: Type[],
    ...typUmowiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typUmowies: Type[] = typUmowiesToCheck.filter(isPresent);
    if (typUmowies.length > 0) {
      const typUmowyCollectionIdentifiers = typUmowyCollection.map(typUmowyItem => this.getTypUmowyIdentifier(typUmowyItem)!);
      const typUmowiesToAdd = typUmowies.filter(typUmowyItem => {
        const typUmowyIdentifier = this.getTypUmowyIdentifier(typUmowyItem);
        if (typUmowyCollectionIdentifiers.includes(typUmowyIdentifier)) {
          return false;
        }
        typUmowyCollectionIdentifiers.push(typUmowyIdentifier);
        return true;
      });
      return [...typUmowiesToAdd, ...typUmowyCollection];
    }
    return typUmowyCollection;
  }
}
