import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly languageState = signal<Language>('en');
  
  readonly currentLanguage = this.languageState.asReadonly();
  
  setLanguage(language: Language): void {
    this.languageState.set(language);
  }
  
  toggleLanguage(): void {
    const current = this.languageState();
    this.setLanguage(current === 'en' ? 'es' : 'en');
  }
}