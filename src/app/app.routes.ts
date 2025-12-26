import { Routes } from '@angular/router';
import { App } from './app';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/voting-dashboard/voting-dashboard').then(m => m.VotingDashboard)
      }
    ]
  },
  {
    path: '**',
    component: NotFound,
  }

];

