import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWystawca } from '../wystawca.model';
import { WystawcaService } from '../service/wystawca.service';

export const wystawcaResolve = (route: ActivatedRouteSnapshot): Observable<null | IWystawca> => {
  const id = route.params['id'];
  if (id) {
    return inject(WystawcaService)
      .find(id)
      .pipe(
        mergeMap((wystawca: HttpResponse<IWystawca>) => {
          if (wystawca.body) {
            return of(wystawca.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default wystawcaResolve;
