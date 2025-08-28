import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Card } from '../card/card';
import { TranslationService } from '../../services/translation-service';

// Experience item data structure
interface ExperienceItem {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly period: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly companyUrl?: string;
}

// Experience component that displays professional experience using cards
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [Card],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Experience {
  private readonly translationService = inject(TranslationService); // Translation service
  
  // Experience data stored in signal for reactivity
  private readonly experienceData = signal<readonly ExperienceItem[]>([
    {
      id: 'internship',
      company: 'Chilevisión S.A.',
      position: 'Professional Internship',
      period: '2024 - 2024',
      description: 'I developed a website using Flask to generate reports with Excel export and user profiling. I implemented a CRUD for user and permission management, using SQL Server for queries and deploying it on IIS. I also automated the process of create a daily backup on the database, plus sending a email to the responsable.',
      technologies: ['Python', 'Flask', 'SQL Server', 'IIS']
    }
  ]);

  // Transform experience data for card display with translations
  readonly experiences = computed(() => 
    this.experienceData().map(exp => ({
      title: `${this.translate('experience.position')} at ${this.translate('experience.company')}`,
      description: `${this.translate('experience.period')} - ${this.translate('experience.description')}`,
      tags: exp.technologies,
      imageUrl: ''
    }))
  );

  // Get total number of experiences
  readonly totalExperiences = computed(() => 
    this.experienceData().length
  );

  // Calculate years of experience based on start year
  readonly yearsOfExperience = computed(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    return currentYear - startYear;
  });

  // Get translated text for given key
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}