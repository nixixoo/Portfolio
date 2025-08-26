import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  /**
   * 🔑 ROUTE PARAMETER: Project ID from URL
   * Angular automatically binds this from route parameter
   */
  readonly projectId = input.required<string>();

  /**
   * 🎯 REACTIVE PROJECT DATA: Auto-updating project information
   * Handles both data retrieval and error states
   */
  readonly project = computed(() => {
    const id = this.projectId();
    const project = this.projectsService.getProjectById(id);
    
    if (!project) {
      // Graceful error handling - redirect to home
      setTimeout(() => this.router.navigate(['']), 100);
      return null;
    }
    
    return project;
  });

  /**
   * 📍 NAVIGATION CONTEXT: Previous/Next project logic
   * Enables seamless project browsing
   */
  readonly navigationData = computed(() => {
    const projects = this.projectsService.projects();
    const currentProject = this.project();
    
    if (!currentProject) return { prev: null, next: null };
    
    const currentIndex = projects.findIndex(p => p.id === currentProject.id);
    
    return {
      prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
  });

  /**
   * 🎨 CATEGORY STYLING: Dynamic styling based on project category
   */
  readonly categoryStyles = computed(() => {
    const project = this.project();
    if (!project) return '';
    
    const styles = {
      'portfolio': 'bg-purple-light text-white',
      'web-app': 'bg-yellow text-purple',
      'platform': 'bg-orange-light text-white',
      'api': 'bg-orange text-white'
    };
    
    return styles[project.category] || 'bg-purple text-yellow';
  });

  /**
   * 🧭 NAVIGATION METHODS: Project traversal
   */
  navigateToProject(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}