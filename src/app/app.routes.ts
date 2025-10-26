import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Home } from './pages/home/home';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { ProjectsService } from './services/projects-service';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Portfolio - Nicolás Aliaga',
  },
  {
    path: 'project/:id',
    component: ProjectDetail,
    title: (route) => {
      const projectsService = inject(ProjectsService);
      const projectId = route.params['id'];
      const project = projectsService.getProjectById(projectId);
      
      // Use project title if found, otherwise fallback to ID
      return project?.title 
        ? `${project.title} - Portfolio` 
        : `${projectId} - Project Detail`;
    },
  },
  {
    path: '**',
    redirectTo: ''
  }
];