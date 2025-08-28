
import { Component, ChangeDetectionStrategy, computed, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectsService, ProjectData } from '../../services/projects-service';
import { TranslationService } from '../../services/translation-service';
import { LenisService } from '../../services/lenis-service';
import { CommonModule } from '@angular/common';

// Project detail page component with image zoom and navigation
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetail implements OnInit {
  private readonly projectsService = inject(ProjectsService); // Project data service
  private readonly router = inject(Router); // Navigation service
  private readonly route = inject(ActivatedRoute); // Route parameters service
  private readonly location = inject(Location); // Angular location service
  private readonly lenisService = inject(LenisService); // Smooth scroll service
  private readonly translationService = inject(TranslationService); // Translation service

  readonly isImageZoomActive = signal(false); // Image zoom state
  readonly imageMousePosition = signal<{x: number, y: number}>({ x: 50, y: 50 }); // Mouse position for zoom

  // Smooth scroll to top when entering project detail page
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Try Lenis first for smooth scroll, fallback to native smooth scroll
      const lenis = this.lenisService.getLenis();
      if (lenis) {
        lenis.scrollTo(0, { 
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
  
  // Get project ID from route parameters
  readonly projectId = computed(() => {
    return this.route.snapshot.paramMap.get('id');
  });

  // Get current project data with navigation fallback
  readonly project = computed(() => {
    const id = this.projectId();
    
    if (!id) {
      return null;
    }
    
    const project = this.projectsService.getProjectById(id);
    
    if (!project) {
      setTimeout(() => this.router.navigate(['']), 100); // Redirect if project not found
      return null;
    }
    
    return project;
  });


  // Get previous and next project for navigation
  readonly navigationData = computed(() => {
    const projects = this.projectsService.projects();
    const currentProject = this.project();
    
    if (!currentProject) {
      return { prev: null, next: null };
    }
    
    const currentIndex = projects.findIndex(p => p.id === currentProject.id);
    
    return {
      prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
  });

 
  // Get CSS classes for project category badge
  readonly categoryStyles = computed(() => {
    const project = this.project();
    
    if (!project) {
      return 'bg-purple text-yellow';
    }
    
    const styles: Record<string, string> = {
      'portfolio': 'bg-purple-light text-white',
      'web-app': 'bg-yellow text-purple',
      'platform': 'bg-orange-light text-white',
      'api': 'bg-orange text-white'
    };
    
    return styles[project.category] || 'bg-purple text-yellow';
  });


  // Navigate to another project page
  navigateToProject(projectId: string): void {
    if (!projectId || projectId.trim() === '') {
      return;
    }
    
    this.router.navigate(['/project', projectId]);
  }

  // Navigate back using browser history
  goBack(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolioInternalNavigation', 'true');
    }
    this.location.back();
  }

  // Get translated text for given key
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  // Get translated status text
  translateStatus(status: string): string {
    return this.translationService.translate(`status.${status}`);
  }

  // Toggle image zoom on click
  onImageClick(): void {
    this.isImageZoomActive.set(!this.isImageZoomActive());
  }

  // Track mouse position for image zoom effect
  onImageMouseMove(event: MouseEvent): void {
    if (this.isImageZoomActive()) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.imageMousePosition.set({ x, y });
    }
  }

  // Disable zoom when mouse leaves image
  onImageMouseLeave(): void {
    this.isImageZoomActive.set(false);
  }
}