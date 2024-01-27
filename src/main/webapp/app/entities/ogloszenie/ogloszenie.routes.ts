import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OgloszenieComponent } from './list/ogloszenie.component';
import { OgloszenieDetailComponent } from './detail/ogloszenie-detail.component';
import { OgloszenieUpdateComponent } from './update/ogloszenie-update.component';
import OgloszenieResolve from './route/ogloszenie-routing-resolve.service';

const ogloszenieRoute: Routes = [
  {
    path: '',
    component: OgloszenieComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OgloszenieDetailComponent,
    resolve: {
      ogloszenie: OgloszenieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OgloszenieUpdateComponent,
    resolve: {
      ogloszenie: OgloszenieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OgloszenieUpdateComponent,
    resolve: {
      ogloszenie: OgloszenieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ogloszenieRoute;
