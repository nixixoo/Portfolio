import { Injectable, signal } from '@angular/core';

export interface ProjectData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly imageUrl?: string;
  readonly technologies: readonly string[];
  readonly viewUrl?: string;
  readonly githubUrl?: string;
  readonly status: 'completed' | 'in-progress' | 'planned';
  readonly startDate: string;
  readonly features: readonly string[];
  readonly challenges?: readonly string[];
  readonly category: 'web-app' | 'portfolio' | 'platform' | 'api';
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projectsState = signal<readonly ProjectData[]>([
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: 'A minimalist, pixelated portfolio.',
      longDescription: `This portfolio represents a modern approach to personal branding through 
        web development. Built with Angular 20's cutting-edge features including signals, zoneless 
        change detection, and SSR capabilities. The design embraces a retro-pixelated aesthetic 
        while maintaining professional functionality and performance optimization.`,
      technologies: ['Angular', 'Tailwind', 'TypeScript'],
      viewUrl: 'https://github.com/nixixoo/Portfolio',
      githubUrl: 'https://github.com/nixixoo/Portfolio',
      status: 'completed',
      startDate: '2025-08',
      category: 'portfolio',
      features: [
        'Modern Angular 20 with Signals API',
        'Server-Side Rendering for optimal SEO',
        'Custom smooth scrolling with Lenis integration',
        'Performance-optimized particle animations',
        'Zoneless change detection for better performance'
      ],
      challenges: [
        'Implementing SSR with client-side animations',
        'Custom scrollbar integration with Lenis',
        'Balancing retro aesthetics with modern UX',
        'Optimizing bundle size while maintaining features'
      ]
    },
    {
      id: 'mynotex',
      title: 'My Notex',
      description: 'A simple note taking application with AI chat integrated.',
      longDescription: `My Notex is a comprehensive note-taking platform that bridges traditional 
        note organization with AI-powered assistance. Built with a modern tech stack featuring 
        Angular for the frontend, Node.js/Express for the backend, and TursoSQL for efficient 
        data management. The integrated AI chat talks with the users inside the context of the note.`,
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'TursoSQL'],
      viewUrl: 'https://mynotex.vercel.app',
      githubUrl: 'https://github.com/nixixoo/Notex',
      status: 'completed',
      startDate: '2025-02',
      category: 'web-app',
      features: [
        'Real-time note editing and synchronization',
        'Smart note categorization and tagging',
        'Offline-first architecture with sync'
      ],
      challenges: [
        'Integrating AI chat seamlessly with note interface',
        ''
      ]
    },
    {
      id: 'abysstr',
      title: 'Abyss Team Request',
      description: 'A platform where you can sent a team request to your favorite content creator, so he can play with that.',
      longDescription: `Abyss Team Request is an innovative platform designed to connect Genshin Impact 
        communities with content creators. Users can submit team requests with a message included, 
        providing more interaction between content creator and public. Built with Angular and Firebase, 
        including authentication and user profiles.`,
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      viewUrl: 'https://abyssteamrequest.vercel.app',
      githubUrl: 'https://github.com/nixixoo/AbyssPage',
      status: 'completed',
      startDate: '2024-12',
      category: 'platform',
      features: [
        'Request submission system',
        'Content creator profile management',
        'Integrated little note system',
      ],
      challenges: [
        'Implementing real-time features without performance degradation',
        'Creating intuitive UX for complex user interactions',
      ]
    }
  ]);

  readonly projects = this.projectsState.asReadonly();

  /**
   * 🔍 PROJECT LOOKUP: Efficient single-project retrieval
   * Used by router for detail page resolution
   */
  getProjectById(id: string): ProjectData | undefined {
    return this.projects().find(project => project.id === id);
  }

  /**
   * 📊 PROJECT ANALYTICS: Computed statistics
   * Demonstrates reactive data derivation patterns
   */
  readonly projectStats = signal({
    total: this.projects().length,
    completed: this.projects().filter(p => p.status === 'completed').length,
    technologies: [...new Set(this.projects().flatMap(p => p.technologies))].length,
    categories: [...new Set(this.projects().map(p => p.category))].length
  });
}