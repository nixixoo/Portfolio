import { Injectable, signal, computed, inject } from '@angular/core';
import { TranslationService } from './translation-service';

// Project data structure with all required properties
export interface ProjectData {
  readonly id: string; // Unique project identifier
  readonly title: string; // Project title
  readonly description: string; // Short description
  readonly longDescription?: string; // Detailed description
  readonly imageUrl?: string; // Project image URL
  readonly technologies: readonly string[]; // Technology stack
  readonly viewUrl?: string; // Live demo URL
  readonly githubUrl?: string; // GitHub repository URL
  readonly docLink?: string; // Documentation URL (Google Drive, etc.)
  readonly status: 'completed' | 'in-progress' | 'planned'; // Project status
  readonly startDate: string; // Start date
  readonly features: readonly string[]; // Feature list
  readonly challenges?: readonly string[]; // Development challenges
  readonly category: 'web-app' | 'portfolio' | 'platform' | 'api' | 'database' | 'data-analysis'; // Project category
}

// Service for managing project data with translations
@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly translationService = inject(TranslationService); // Translation service
  
  // Project data stored in signal for reactivity
  private readonly projectsState = signal<readonly ProjectData[]>([
    {
      id: 'portfolio',
      title: '', 
      description: '', 
      longDescription: '', 
      imageUrl: '/images/Portfolio.png',
      technologies: ['Angular', 'Tailwind', 'TypeScript'],
      viewUrl: 'https://github.com/nixixoo/Portfolio',
      githubUrl: 'https://github.com/nixixoo/Portfolio',
      status: 'completed',
      startDate: '2025-08',
      category: 'portfolio',
      features: [], 
      challenges: [] 
    },
    {
      id: 'mynotex',
      title: '', 
      description: '',  
      longDescription: '', 
      imageUrl: '/images/MyNotex1.png',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'TursoSQL'],
      viewUrl: 'https://mynotex.vercel.app',
      githubUrl: 'https://github.com/nixixoo/Notex',
      docLink: 'https://docs.google.com/document/d/1uOP1I1lD0rnTnVe1Dkbo57M0HP507jqH5saFmSjhxRg/edit?usp=sharing',
      status: 'completed',
      startDate: '2025-02',
      category: 'web-app',
      features: [], 
      challenges: [] 
    },
    {
      id: 'abysstr',
      title: '', 
      description: '', 
      longDescription: '', 
      imageUrl: '/images/AbyssTR1.png',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      viewUrl: 'https://abyssteamrequest.vercel.app',
      githubUrl: 'https://github.com/nixixoo/AbyssPage',
      status: 'completed',
      startDate: '2024-12',
      category: 'platform',
      features: [], 
      challenges: [] 
    },
    {
      id: 'taskapi',
      title: '', 
      description: '', 
      longDescription: '', 
      imageUrl: '/images/Express.png',
      technologies: ['Express.js', 'MongoDB', 'JWT', 'bcryptjs', 'RESTful API '],
      githubUrl: 'https://github.com/nixixoo/ExpressTodoAPI',
      status: 'completed',
      startDate: '2025-09',
      category: 'web-app',
      features: [], 
      challenges: [] 
    },
    {
      id: 'library-management-system',
      title: '', 
      description: '',
      longDescription: '',
      imageUrl: '/images/PostgreSQL.png',
      technologies: ['PostgreSQL', 'pgAdmin 4', 'Database Management'],
      githubUrl: 'https://github.com/nixixoo/PostgreSQL-Library-Example',
      status: 'completed',
      startDate: '2025-10',
      category: 'web-app',
      features: [], 
      challenges: []
    },
    {
      id: 'data-analysis-placeholder',
      title: '', 
      description: '',
      longDescription: '',
      imageUrl: '/images/DataAnalysis.png',
      technologies: ['Python', 'Pandas', 'Excel', 'Power BI'],
      status: 'planned',
      startDate: '2025-11',
      category: 'data-analysis',
      features: [], 
      challenges: []
    }
  ]);

  // Read-only projects signal
  readonly projects = this.projectsState.asReadonly();

  // Projects with translated content
  readonly translatedProjects = computed(() => 
    this.projects().map(project => ({
      ...project,
      title: this.translate(`project.${project.id}.title`),
      description: this.translate(`project.${project.id}.description`),
      longDescription: this.translate(`project.${project.id}.longDescription`),
      features: this.getTranslatedFeatures(project.id),
      challenges: this.getTranslatedChallenges(project.id)
    }))
  );

  // Get translated features for a project
  private getTranslatedFeatures(projectId: string): string[] {
    const features: string[] = [];
    let index = 1;
    
    while (true) {
      const key = `project.${projectId}.feature${index}`;
      const translation = this.translate(key);
      
      if (translation === key) break;
      
      features.push(translation);
      index++;
    }
    
    return features;
  }

  // Get translated challenges for a project
  private getTranslatedChallenges(projectId: string): string[] {
    const challenges: string[] = [];
    let index = 1;
    
    while (true) {
      const key = `project.${projectId}.challenge${index}`;
      const translation = this.translate(key);
      
      if (translation === key) break;
      
      challenges.push(translation);
      index++;
    }
    
    return challenges;
  }

  // Get project by ID with translations applied
  getProjectById(id: string): ProjectData | undefined {
    return this.translatedProjects().find(project => project.id === id);
  }

  // Computed project statistics
  readonly projectStats = signal({
    total: this.projects().length,
    completed: this.projects().filter(p => p.status === 'completed').length,
    technologies: [...new Set(this.projects().flatMap(p => p.technologies))].length,
    categories: [...new Set(this.projects().map(p => p.category))].length
  });

  // Get translated text for given key
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}