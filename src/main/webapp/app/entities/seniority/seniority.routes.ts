import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SeniorityComponent } from './list/seniority.component';
import { SeniorityDetailComponent } from './detail/seniority-detail.component';
import { SeniorityUpdateComponent } from './update/seniority-update.component';
import SeniorityResolve from './route/seniority-routing-resolve.service';

const seniorityRoute: Routes = [
  {
    path: '',
    component: SeniorityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeniorityDetailComponent,
    resolve: {
      seniority: SeniorityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeniorityUpdateComponent,
    resolve: {
      seniority: SeniorityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeniorityUpdateComponent,
    resolve: {
      seniority: SeniorityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default seniorityRoute;
