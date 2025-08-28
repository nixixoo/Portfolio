import { Component, input, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation-service';

// Card component for displaying project information with action buttons
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  private readonly router = inject(Router); // Navigation service
  private readonly translationService = inject(TranslationService); // Translation service

  readonly title = input<string>(''); // Project title
  readonly imageUrl = input<string>(''); // Project image URL
  readonly description = input<string>(''); // Project description
  readonly tags = input<readonly string[]>([]); // Technology tags
  readonly projectId = input<string>(''); // Project ID for navigation
  readonly githubUrl = input<string>(''); // GitHub repository URL
  readonly liveUrl = input<string>(''); // Live demo URL

  // Check if project has navigation details
  readonly hasProjectNavigation = computed(() => 
    Boolean(this.projectId())
  );

  // Check if project has GitHub link
  readonly hasGithubLink = computed(() => 
    Boolean(this.githubUrl())
  );

  // Check if project has live demo
  readonly hasLiveDemo = computed(() => 
    Boolean(this.liveUrl())
  );

  // Configuration for action buttons based on available URLs
  readonly buttonConfig = computed(() => {
    return {
      showDetails: this.hasProjectNavigation(),
      showGithub: this.hasGithubLink(),
      showLive: this.hasLiveDemo(),
      primaryAction: this.hasProjectNavigation() 
        ? 'details' 
        : this.hasLiveDemo() 
        ? 'live' 
        : 'github'
    };
  });

  // Navigate to project details page
  navigateToProject(): void {
    const id = this.projectId();
    if (!id) {
      return;
    }
    
    this.router.navigate(['/project', id]);
  }

  // Open GitHub repository in new tab
  openGitHub(): void {
    const url = this.githubUrl();
    if (!url) {
      return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Open live demo in new tab
  openLiveDemo(): void {
    const url = this.liveUrl();
    if (!url) {
      return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Get translated text for given key
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}