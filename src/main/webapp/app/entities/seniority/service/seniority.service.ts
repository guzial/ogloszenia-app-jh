import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISeniority, NewSeniority } from '../seniority.model';

export type PartialUpdateSeniority = Partial<ISeniority> & Pick<ISeniority, 'id'>;

export type EntityResponseType = HttpResponse<ISeniority>;
export type EntityArrayResponseType = HttpResponse<ISeniority[]>;

@Injectable({ providedIn: 'root' })
export class SeniorityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/seniorities');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(seniority: NewSeniority): Observable<EntityResponseType> {
    return this.http.post<ISeniority>(this.resourceUrl, seniority, { observe: 'response' });
  }

  update(seniority: ISeniority): Observable<EntityResponseType> {
    return this.http.put<ISeniority>(`${this.resourceUrl}/${this.getSeniorityIdentifier(seniority)}`, seniority, { observe: 'response' });
  }

  partialUpdate(seniority: PartialUpdateSeniority): Observable<EntityResponseType> {
    return this.http.patch<ISeniority>(`${this.resourceUrl}/${this.getSeniorityIdentifier(seniority)}`, seniority, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISeniority>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISeniority[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSeniorityIdentifier(seniority: Pick<ISeniority, 'id'>): number {
    return seniority.id;
  }

  compareSeniority(o1: Pick<ISeniority, 'id'> | null, o2: Pick<ISeniority, 'id'> | null): boolean {
    return o1 && o2 ? this.getSeniorityIdentifier(o1) === this.getSeniorityIdentifier(o2) : o1 === o2;
  }

  addSeniorityToCollectionIfMissing<Type extends Pick<ISeniority, 'id'>>(
    seniorityCollection: Type[],
    ...senioritiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const seniorities: Type[] = senioritiesToCheck.filter(isPresent);
    if (seniorities.length > 0) {
      const seniorityCollectionIdentifiers = seniorityCollection.map(seniorityItem => this.getSeniorityIdentifier(seniorityItem)!);
      const senioritiesToAdd = seniorities.filter(seniorityItem => {
        const seniorityIdentifier = this.getSeniorityIdentifier(seniorityItem);
        if (seniorityCollectionIdentifiers.includes(seniorityIdentifier)) {
          return false;
        }
        seniorityCollectionIdentifiers.push(seniorityIdentifier);
        return true;
      });
      return [...senioritiesToAdd, ...seniorityCollection];
    }
    return seniorityCollection;
  }
}
