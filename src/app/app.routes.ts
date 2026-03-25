import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/brand-list/brand-list.component').then(c => c.BrandListComponent),
    title: 'Marcas de Vehículos'
  },
  {
    path:'brand/:id',
    loadComponent: () => import('./features/brand-detail/brand-detail.component').then(c => c.BrandDetailComponent),
    title: 'Detalles de la Marca'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

