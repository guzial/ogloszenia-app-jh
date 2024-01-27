import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypUmowy } from '../typ-umowy.model';
import { TypUmowyService } from '../service/typ-umowy.service';

export const typUmowyResolve = (route: ActivatedRouteSnapshot): Observable<null | ITypUmowy> => {
  const id = route.params['id'];
  if (id) {
    return inject(TypUmowyService)
      .find(id)
      .pipe(
        mergeMap((typUmowy: HttpResponse<ITypUmowy>) => {
          if (typUmowy.body) {
            return of(typUmowy.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default typUmowyResolve;
