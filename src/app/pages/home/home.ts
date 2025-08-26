import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import lenis from 'lenis';
import { Particles } from "../../components/particles/particles";
import { HomeAnimation } from "../../components/home-animation/home-animation";
import { Card } from "../../components/card/card";
import { Experience } from "../../components/experience/experience";
import { ProjectsService } from "../../services/projects-service";

@Component({
  selector: 'app-home',
  imports: [Particles, HomeAnimation, Card, Experience],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  
  // 🎯 DEPENDENCY INJECTION: Modern inject() pattern
  private readonly projectsService = inject(ProjectsService);
  
  // Animation state management (existing code)
  private readonly animationCompleted = signal(false);
  private readonly animationFadingOut = signal(false);

  // ✅ CRITICAL INTEGRATION: Service data → Card-compatible format
  readonly projectCards = computed(() => 
    this.projectsService.projects().map(project => ({
      title: project.title,
      description: project.description,
      tags: project.technologies,
      link: project.githubUrl ?? project.viewUrl ?? '',
      imageUrl: project.imageUrl ?? '',
      projectId: project.id // 🔑 CRITICAL: Enable navigation
    }))
  );

  // 📊 DERIVED METRICS: Computed analytics from service data
  readonly totalProjects = computed(() => 
    this.projectsService.projects().length
  );

  readonly uniqueTechnologies = computed(() => {
    const allTechs = ['Angular', 'Flask', 'TypeScript', 'TailwindCSS', 'Node.js', 'SQL Server', 'Firebase', 'Git', 'RESTful API'];
    //this.projectsService.projects()
    // .flatMap(project => project.technologies);
    return [...new Set(allTechs)]; // Remove duplicates
  });

  readonly techCount = computed(() => 
    this.uniqueTechnologies().length
  );

  // Featured project data (existing code)
  readonly featured = {
    title: 'Retro Portfolio',
    imageUrl: '',
    description: 'A minimalist, retro-inspired portfolio built with Angular 19, SSR, and Tailwind v4.',
    link: '#',
    tags: ['Angular', 'Tailwind', 'SSR'] as const
  };
  
  // Animation computed properties (existing code)
  readonly showEntryAnimation = computed(() => 
    !this.animationCompleted()
  );

  readonly isAnimationFadingOut = computed(() => 
    this.animationFadingOut()
  );

  // Animation event handlers (existing code)
  onAnimationFadeOutStarted(): void {
    this.animationFadingOut.set(true);
  }

  onEntryAnimationComplete(): void {
    setTimeout(() => {
      this.animationCompleted.set(true);
    }, 300);
  }
}

/**
 * 📚 CRITICAL TEACHING POINTS:
 * 
 * 1. REACTIVE DATA FLOW:
 *    ProjectsService.projects() → projectCards computed() → DOM
 *    Changes propagate automatically through signal chain
 * 
 * 2. TYPE SAFETY BRIDGE:
 *    ProjectData interface → Card input interface
 *    TypeScript ensures compatibility at compile time
 * 
 * 3. PERFORMANCE OPTIMIZATION:
 *    - OnPush: Only re-renders when signals change
 *    - Computed: Memoized calculations, recalc only when dependencies change
 *    - Readonly arrays: Enable Angular optimizations
 * 
 * 4. ERROR PREVENTION:
 *    - Nullish coalescing (??) handles undefined viewUrl/imageUrl
 *    - Readonly typing prevents accidental mutations
 *    - Signal-based reactivity eliminates subscription memory leaks
 */