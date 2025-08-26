import { Component, input, inject, computed } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 🎯 CARD COMPONENT: Enhanced with Dual Action Pattern
 * 
 * ARCHITECTURAL PRINCIPLES:
 * - Single Responsibility: Card only handles presentation
 * - Separation of Concerns: Navigation vs External Links
 * - Conditional Logic: Smart action button rendering
 * - Type Safety: Strong typing prevents runtime errors
 */
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  private readonly router = inject(Router);

  // ✅ EXISTING INPUTS: Maintain backward compatibility
  readonly title = input<string>('');
  readonly imageUrl = input<string>('');  
  readonly description = input<string>('');
  readonly tags = input<readonly string[]>([]);
  
  // 🔑 ENHANCED INPUTS: Multiple URL types
  readonly projectId = input<string>('');
  readonly githubUrl = input<string>('');
  readonly liveUrl = input<string>('');

  /**
   * 🎯 COMPUTED ACTION STATES
   * 
   * Why computed() over methods:
   * - Memoized: Only recalculates when inputs change
   * - Reactive: Updates automatically with input changes
   * - Performance: Avoids unnecessary function calls in templates
   * - Type-safe: Compile-time validation of logic
   */
  readonly hasProjectNavigation = computed(() => 
    Boolean(this.projectId())
  );

  readonly hasGithubLink = computed(() => 
    Boolean(this.githubUrl())
  );

  readonly hasLiveDemo = computed(() => 
    Boolean(this.liveUrl())
  );

  /**
   * 📊 COMPUTED BUTTON CONFIGURATION
   * 
   * Teaching Point: Complex UI logic should be computed, not in templates
   * This approach provides:
   * - Clear separation of concerns
   * - Testable business logic
   * - Better performance through memoization
   */
  readonly buttonConfig = computed(() => {
    return {
      showDetails: this.hasProjectNavigation(),
      showGithub: this.hasGithubLink(),
      showLive: this.hasLiveDemo(),
      // Priority order: Details > Live Demo > GitHub
      primaryAction: this.hasProjectNavigation() 
        ? 'details' 
        : this.hasLiveDemo() 
        ? 'live' 
        : 'github'
    };
  });

  /**
   * 🧭 NAVIGATION METHODS: Type-safe action handlers
   * 
   * Best Practice: Validate inputs before taking actions
   * This prevents silent failures and improves debugging
   */
  navigateToProject(): void {
    const id = this.projectId();
    if (!id) {
      console.warn('Card: Cannot navigate - projectId is empty');
      return;
    }
    
    this.router.navigate(['/project', id]);
  }

  openGitHub(): void {
    const url = this.githubUrl();
    if (!url) {
      console.warn('Card: Cannot open GitHub - URL is empty');
      return;
    }
    
    // Security: Ensure proper window.open usage
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openLiveDemo(): void {
    const url = this.liveUrl();
    if (!url) {
      console.warn('Card: Cannot open demo - URL is empty');
      return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}