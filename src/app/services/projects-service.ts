import { Injectable, signal, computed, inject } from '@angular/core';
import { TranslationService } from './translation-service';

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
  private readonly translationService = inject(TranslationService);
  
  private readonly projectsState = signal<readonly ProjectData[]>([
    {
      id: 'portfolio',
      title: '', // Will be populated by translation service
      description: '', // Will be populated by translation service
      longDescription: '', // Will be populated by translation service
      imageUrl: '/images/Portfolio.png',
      technologies: ['Angular', 'Tailwind', 'TypeScript'],
      viewUrl: 'https://github.com/nixixoo/Portfolio',
      githubUrl: 'https://github.com/nixixoo/Portfolio',
      status: 'completed',
      startDate: '2025-08',
      category: 'portfolio',
      features: [], // Will be populated by translation service (5 features)
      challenges: [] // Will be populated by translation service (4 challenges)
    },
    {
      id: 'mynotex',
      title: '', // Will be populated by translation service
      description: '', // Will be populated by translation service  
      longDescription: '', // Will be populated by translation service
      imageUrl: '/images/MyNotex1.png',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'TursoSQL'],
      viewUrl: 'https://mynotex.vercel.app',
      githubUrl: 'https://github.com/nixixoo/Notex',
      status: 'completed',
      startDate: '2025-02',
      category: 'web-app',
      features: [], // Will be populated by translation service (3 features)
      challenges: [] // Will be populated by translation service (1 challenge)
    },
    {
      id: 'abysstr',
      title: '', // Will be populated by translation service
      description: '', // Will be populated by translation service
      longDescription: '', // Will be populated by translation service
      imageUrl: '/images/AbyssTR1.png',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      viewUrl: 'https://abyssteamrequest.vercel.app',
      githubUrl: 'https://github.com/nixixoo/AbyssPage',
      status: 'completed',
      startDate: '2024-12',
      category: 'platform',
      features: [], // Will be populated by translation service (3 features)
      challenges: [] // Will be populated by translation service (2 challenges)
    }
  ]);

  readonly projects = this.projectsState.asReadonly();

  // ✅ Translated projects with reactive updates
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

  private getTranslatedFeatures(projectId: string): string[] {
    const features: string[] = [];
    let index = 1;
    
    while (true) {
      const key = `project.${projectId}.feature${index}`;
      const translation = this.translate(key);
      
      // If translation returns the key itself, it means no translation exists
      if (translation === key) break;
      
      features.push(translation);
      index++;
    }
    
    return features;
  }

  private getTranslatedChallenges(projectId: string): string[] {
    const challenges: string[] = [];
    let index = 1;
    
    while (true) {
      const key = `project.${projectId}.challenge${index}`;
      const translation = this.translate(key);
      
      // If translation returns the key itself, it means no translation exists
      if (translation === key) break;
      
      challenges.push(translation);
      index++;
    }
    
    return challenges;
  }

  /**
   * 🔍 PROJECT LOOKUP: Efficient single-project retrieval
   * Used by router for detail page resolution
   */
  getProjectById(id: string): ProjectData | undefined {
    return this.translatedProjects().find(project => project.id === id);
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

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}