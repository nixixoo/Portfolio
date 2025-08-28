import { Component, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LenisService } from '../../services/lenis-service';
import { LanguageService } from '../../services/language-service';
import { TranslationService } from '../../services/translation-service';

// Header component with navigation and language switching
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  private readonly lenisService = inject(LenisService); // Smooth scroll service
  private readonly languageService = inject(LanguageService); // Language management
  private readonly translationService = inject(TranslationService); // Translation service
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private mobileMenuOpen = signal(false); // Mobile menu state

  isMobileMenuOpen = this.mobileMenuOpen.asReadonly(); // Read-only mobile menu state
  currentLanguage = this.languageService.currentLanguage; // Current language signal
  
  // Toggle mobile menu open/close state
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(isOpen => !isOpen);
  }
  
  // Close mobile menu
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  // Switch between available languages
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  // Get translated text for given key
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  // Smooth scroll to section with Lenis integration
  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }
    
    const lenis = this.lenisService.getLenis();
    
    if (lenis) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      
      lenis.scrollTo(targetPosition, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false
      });
    } else {
      this.fallbackSmoothScroll(element);
    }
  }

  // Fallback smooth scroll when Lenis is not available
  private fallbackSmoothScroll(element: HTMLElement): void {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1000);
  }
}