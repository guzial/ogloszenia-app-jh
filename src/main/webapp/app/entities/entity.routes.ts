import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ogloszenie',
    data: { pageTitle: 'ogloszeniaApp.ogloszenie.home.title' },
    loadChildren: () => import('./ogloszenie/ogloszenie.routes'),
  },
  {
    path: 'wystawca',
    data: { pageTitle: 'ogloszeniaApp.wystawca.home.title' },
    loadChildren: () => import('./wystawca/wystawca.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'ogloszeniaApp.tag.home.title' },
    loadChildren: () => import('./tag/tag.routes'),
  },
  {
    path: 'grupa-tagow',
    data: { pageTitle: 'ogloszeniaApp.grupaTagow.home.title' },
    loadChildren: () => import('./grupa-tagow/grupa-tagow.routes'),
  },
  {
    path: 'seniority',
    data: { pageTitle: 'ogloszeniaApp.seniority.home.title' },
    loadChildren: () => import('./seniority/seniority.routes'),
  },
  {
    path: 'typ-umowy',
    data: { pageTitle: 'ogloszeniaApp.typUmowy.home.title' },
    loadChildren: () => import('./typ-umowy/typ-umowy.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
