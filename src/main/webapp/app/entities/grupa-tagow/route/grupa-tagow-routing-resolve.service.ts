import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupaTagow } from '../grupa-tagow.model';
import { GrupaTagowService } from '../service/grupa-tagow.service';

export const grupaTagowResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupaTagow> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupaTagowService)
      .find(id)
      .pipe(
        mergeMap((grupaTagow: HttpResponse<IGrupaTagow>) => {
          if (grupaTagow.body) {
            return of(grupaTagow.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupaTagowResolve;
