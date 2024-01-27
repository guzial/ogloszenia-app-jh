import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOgloszenie, NewOgloszenie } from '../ogloszenie.model';

export type PartialUpdateOgloszenie = Partial<IOgloszenie> & Pick<IOgloszenie, 'id'>;

type RestOf<T extends IOgloszenie | NewOgloszenie> = Omit<T, 'dataPublikacji' | 'dataWaznosci' | 'startOd'> & {
  dataPublikacji?: string | null;
  dataWaznosci?: string | null;
  startOd?: string | null;
};

export type RestOgloszenie = RestOf<IOgloszenie>;

export type NewRestOgloszenie = RestOf<NewOgloszenie>;

export type PartialUpdateRestOgloszenie = RestOf<PartialUpdateOgloszenie>;

export type EntityResponseType = HttpResponse<IOgloszenie>;
export type EntityArrayResponseType = HttpResponse<IOgloszenie[]>;

@Injectable({ providedIn: 'root' })
export class OgloszenieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ogloszenies');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(ogloszenie: NewOgloszenie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ogloszenie);
    return this.http
      .post<RestOgloszenie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ogloszenie: IOgloszenie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ogloszenie);
    return this.http
      .put<RestOgloszenie>(`${this.resourceUrl}/${this.getOgloszenieIdentifier(ogloszenie)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ogloszenie: PartialUpdateOgloszenie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ogloszenie);
    return this.http
      .patch<RestOgloszenie>(`${this.resourceUrl}/${this.getOgloszenieIdentifier(ogloszenie)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOgloszenie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOgloszenie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOgloszenieIdentifier(ogloszenie: Pick<IOgloszenie, 'id'>): number {
    return ogloszenie.id;
  }

  compareOgloszenie(o1: Pick<IOgloszenie, 'id'> | null, o2: Pick<IOgloszenie, 'id'> | null): boolean {
    return o1 && o2 ? this.getOgloszenieIdentifier(o1) === this.getOgloszenieIdentifier(o2) : o1 === o2;
  }

  addOgloszenieToCollectionIfMissing<Type extends Pick<IOgloszenie, 'id'>>(
    ogloszenieCollection: Type[],
    ...ogloszeniesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ogloszenies: Type[] = ogloszeniesToCheck.filter(isPresent);
    if (ogloszenies.length > 0) {
      const ogloszenieCollectionIdentifiers = ogloszenieCollection.map(ogloszenieItem => this.getOgloszenieIdentifier(ogloszenieItem)!);
      const ogloszeniesToAdd = ogloszenies.filter(ogloszenieItem => {
        const ogloszenieIdentifier = this.getOgloszenieIdentifier(ogloszenieItem);
        if (ogloszenieCollectionIdentifiers.includes(ogloszenieIdentifier)) {
          return false;
        }
        ogloszenieCollectionIdentifiers.push(ogloszenieIdentifier);
        return true;
      });
      return [...ogloszeniesToAdd, ...ogloszenieCollection];
    }
    return ogloszenieCollection;
  }

  protected convertDateFromClient<T extends IOgloszenie | NewOgloszenie | PartialUpdateOgloszenie>(ogloszenie: T): RestOf<T> {
    return {
      ...ogloszenie,
      dataPublikacji: ogloszenie.dataPublikacji?.toJSON() ?? null,
      dataWaznosci: ogloszenie.dataWaznosci?.toJSON() ?? null,
      startOd: ogloszenie.startOd?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOgloszenie: RestOgloszenie): IOgloszenie {
    return {
      ...restOgloszenie,
      dataPublikacji: restOgloszenie.dataPublikacji ? dayjs(restOgloszenie.dataPublikacji) : undefined,
      dataWaznosci: restOgloszenie.dataWaznosci ? dayjs(restOgloszenie.dataWaznosci) : undefined,
      startOd: restOgloszenie.startOd ? dayjs(restOgloszenie.startOd) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOgloszenie>): HttpResponse<IOgloszenie> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOgloszenie[]>): HttpResponse<IOgloszenie[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
