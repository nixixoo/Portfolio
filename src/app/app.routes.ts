import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectDetail } from './pages/project-detail/project-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Portfolio - Nicolás Aliaga'
  },
  {
    path: 'project/:id',
    component: ProjectDetail,
    title: (route) => `${route.params['id']} - Project Detail`
  },
  {
    path: '**',
    redirectTo: ''
  }
];