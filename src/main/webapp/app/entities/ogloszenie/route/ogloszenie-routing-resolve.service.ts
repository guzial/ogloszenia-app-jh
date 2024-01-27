import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOgloszenie } from '../ogloszenie.model';
import { OgloszenieService } from '../service/ogloszenie.service';

export const ogloszenieResolve = (route: ActivatedRouteSnapshot): Observable<null | IOgloszenie> => {
  const id = route.params['id'];
  if (id) {
    return inject(OgloszenieService)
      .find(id)
      .pipe(
        mergeMap((ogloszenie: HttpResponse<IOgloszenie>) => {
          if (ogloszenie.body) {
            return of(ogloszenie.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default ogloszenieResolve;
