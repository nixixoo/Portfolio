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
      id: 'portfolio',
      title: 'Portfolio',
      description: 'A minimalist, pixelated portfolio.',
      technologies: ['Angular', 'Tailwind', 'TypeScript'],
      viewUrl: 'https://github.com/nixixoo/Portfolio'
    },
    {
      id: 'mynotex',
      title: 'My Notex',
      description: 'A simple note taking application with AI chat integrated.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'TursoSQL'],
      viewUrl: 'https://github.com/nixixoo/Notex'
    },
    {
      id: 'abysstr',
      title: 'Abyss Team Request',
      description: 'A platform where you can sent a team request to your favorite content creator, so he can play with that.',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      viewUrl: 'https://github.com/nixixoo/AbyssPage'
    }
  ]);

  readonly projects = this.projectsState.asReadonly();
}