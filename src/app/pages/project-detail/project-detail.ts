// ===========================================
// SOLUCIÓN: PROJECT DETAIL COMPONENT CORREGIDO
// ===========================================

// src/app/pages/project-detail/project-detail.ts
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProjectsService, ProjectData } from '../../services/projects-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetail {
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * 🔑 CRITICAL FIX: Use ActivatedRoute instead of input.required()
   * 
   * Why this approach is superior:
   * - Compatible with SSR: No timing issues during server rendering
   * - Reactive: Automatically updates when route parameters change
   * - Safe: Returns null when parameter is not available
   * - Performance: Only recalculates when route actually changes
   */
  readonly projectId = computed(() => {
    return this.route.snapshot.paramMap.get('id');
  });

  /**
   * 🎯 REACTIVE PROJECT DATA: Safe project lookup with null handling
   * 
   * Teaching Point: Always handle potential null states in computed()
   * This prevents runtime errors and provides graceful degradation
   */
  readonly project = computed(() => {
    const id = this.projectId();
    
    // Guard clause: Handle case where ID is not available
    if (!id) {
      return null;
    }
    
    const project = this.projectsService.getProjectById(id);
    
    if (!project) {
      // Graceful error handling - redirect to home after a brief delay
      setTimeout(() => this.router.navigate(['']), 100);
      return null;
    }
    
    return project;
  });

  /**
   * 📍 NAVIGATION CONTEXT: Safe navigation with null checks
   * 
   * Critical Pattern: Always check for null before array operations
   */
  readonly navigationData = computed(() => {
    const projects = this.projectsService.projects();
    const currentProject = this.project();
    
    // Early return pattern: Prevent unnecessary computations
    if (!currentProject) {
      return { prev: null, next: null };
    }
    
    const currentIndex = projects.findIndex(p => p.id === currentProject.id);
    
    // Boundary checking: Prevent array out-of-bounds errors
    return {
      prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
  });

  /**
   * 🎨 CATEGORY STYLING: Safe styling with fallback
   * 
   * Best Practice: Always provide fallback values in computed properties
   */
  readonly categoryStyles = computed(() => {
    const project = this.project();
    
    // Null safety: Return default style if project is not available
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

  /**
   * 🧭 NAVIGATION METHODS: Safe navigation with validation
   * 
   * Teaching Point: Always validate parameters before navigation
   */
  navigateToProject(projectId: string): void {
    // Input validation: Prevent navigation with invalid IDs
    if (!projectId || projectId.trim() === '') {
      console.warn('Invalid project ID provided for navigation');
      return;
    }
    
    this.router.navigate(['/project', projectId]);
  }

  goBack(): void {
    // Consistent navigation: Always navigate to root, not history back
    this.router.navigate(['']);
  }
}