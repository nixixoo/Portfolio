import { Injectable, signal } from '@angular/core';

// Supported languages type
export type Language = 'en' | 'es';

// Service for managing current language state
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly languageState = signal<Language>('en'); // Current language state
  
  readonly currentLanguage = this.languageState.asReadonly(); // Read-only language signal
  
  // Set current language
  setLanguage(language: Language): void {
    this.languageState.set(language);
  }
  
  // Toggle between available languages
  toggleLanguage(): void {
    const current = this.languageState();
    this.setLanguage(current === 'en' ? 'es' : 'en');
  }
}