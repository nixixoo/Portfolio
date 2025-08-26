import { Component, input, inject, computed } from '@angular/core';
import { Router } from '@angular/router';

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
  readonly link = input<string>('');
  readonly tags = input<readonly string[]>([]);
  
  // 🔑 NEW INPUT: Enable project navigation
  readonly projectId = input<string>('');

  /**
   * 🎯 COMPUTED NAVIGATION STATE
   * Determines whether to show project navigation or external link
   */
  readonly hasProjectNavigation = computed(() => 
    Boolean(this.projectId())
  );

  /**
   * 🧭 PROJECT NAVIGATION: Route to detail page
   * Replaces external link when projectId is provided
   */
  navigateToProject(): void {
    const id = this.projectId();
    if (id) {
      this.router.navigate(['/project', id]);
    }
  }
}