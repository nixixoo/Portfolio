import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LenisService } from '../../services/lenis-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  // Modern inject() pattern for dependency injection
  private readonly lenisService = inject(LenisService);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * 🎯 PROFESSIONAL SMOOTH SCROLL WITH LENIS INTEGRATION
   * 
   * Teaching Points:
   * - Lenis provides superior easing algorithms
   * - Consistent performance across all browsers
   * - Customizable duration and easing curves
   * - Fallback strategy ensures reliability
   */
  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }
    
    const lenis = this.lenisService.getLenis();
    
    if (lenis) {
      // Professional smooth scroll with Lenis
      // Calculate precise position with header offset
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      
      lenis.scrollTo(targetPosition, {
        duration: 1.5,        // Smooth 1.5s animation
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        immediate: false      // Always animate
      });
    } else {
      // Fallback: Enhanced native smooth scroll
      this.fallbackSmoothScroll(element);
    }
  }

  /**
   * 📚 FALLBACK IMPLEMENTATION
   * Ensures functionality even if Lenis fails to initialize
   */
  private fallbackSmoothScroll(element: HTMLElement): void {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
    
    // Cleanup CSS modification
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1000);
  }
}