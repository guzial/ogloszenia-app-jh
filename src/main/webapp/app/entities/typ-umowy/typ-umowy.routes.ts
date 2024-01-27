import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TypUmowyComponent } from './list/typ-umowy.component';
import { TypUmowyDetailComponent } from './detail/typ-umowy-detail.component';
import { TypUmowyUpdateComponent } from './update/typ-umowy-update.component';
import TypUmowyResolve from './route/typ-umowy-routing-resolve.service';

const typUmowyRoute: Routes = [
  {
    path: '',
    component: TypUmowyComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypUmowyDetailComponent,
    resolve: {
      typUmowy: TypUmowyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypUmowyUpdateComponent,
    resolve: {
      typUmowy: TypUmowyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypUmowyUpdateComponent,
    resolve: {
      typUmowy: TypUmowyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default typUmowyRoute;
