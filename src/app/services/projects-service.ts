import { Injectable, signal } from '@angular/core';

export interface ProjectData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly technologies: readonly string[];
  readonly viewUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projectsState = signal<readonly ProjectData[]>([
    {
      id: 'retro-portfolio',
      title: 'Retro Portfolio',
      description: 'A minimalist, retro-inspired portfolio built with Angular 19, SSR, and Tailwind v4.',
      technologies: ['Angular', 'Tailwind', 'SSR'],
      viewUrl: 'https://github.com/tu-usuario/retro-portfolio'
    },
    {
      id: 'task-manager',
      title: 'Task Manager Pro',
      description: 'Modern task management application with real-time updates and team collaboration.',
      technologies: ['Angular', 'Firebase', 'RxJS'],
      viewUrl: 'https://taskmanager.demo.com'
    }
  ]);

  readonly projects = this.projectsState.asReadonly();
}