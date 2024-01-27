import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupaTagowComponent } from './list/grupa-tagow.component';
import { GrupaTagowDetailComponent } from './detail/grupa-tagow-detail.component';
import { GrupaTagowUpdateComponent } from './update/grupa-tagow-update.component';
import GrupaTagowResolve from './route/grupa-tagow-routing-resolve.service';

const grupaTagowRoute: Routes = [
  {
    path: '',
    component: GrupaTagowComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupaTagowDetailComponent,
    resolve: {
      grupaTagow: GrupaTagowResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupaTagowUpdateComponent,
    resolve: {
      grupaTagow: GrupaTagowResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupaTagowUpdateComponent,
    resolve: {
      grupaTagow: GrupaTagowResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupaTagowRoute;
