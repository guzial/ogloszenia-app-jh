import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISeniority } from '../seniority.model';
import { SeniorityService } from '../service/seniority.service';

export const seniorityResolve = (route: ActivatedRouteSnapshot): Observable<null | ISeniority> => {
  const id = route.params['id'];
  if (id) {
    return inject(SeniorityService)
      .find(id)
      .pipe(
        mergeMap((seniority: HttpResponse<ISeniority>) => {
          if (seniority.body) {
            return of(seniority.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default seniorityResolve;
