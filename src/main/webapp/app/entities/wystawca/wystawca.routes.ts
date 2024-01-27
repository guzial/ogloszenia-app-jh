import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { WystawcaComponent } from './list/wystawca.component';
import { WystawcaDetailComponent } from './detail/wystawca-detail.component';
import { WystawcaUpdateComponent } from './update/wystawca-update.component';
import WystawcaResolve from './route/wystawca-routing-resolve.service';

const wystawcaRoute: Routes = [
  {
    path: '',
    component: WystawcaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WystawcaDetailComponent,
    resolve: {
      wystawca: WystawcaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WystawcaUpdateComponent,
    resolve: {
      wystawca: WystawcaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WystawcaUpdateComponent,
    resolve: {
      wystawca: WystawcaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default wystawcaRoute;
