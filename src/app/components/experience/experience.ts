import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Card } from '../card/card';
import { TranslationService } from '../../services/translation-service';

interface ExperienceItem {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly period: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly companyUrl?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [Card],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Experience {
  private readonly translationService = inject(TranslationService);
  
  // Estado local del componente usando signals
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

  // ✅ Computed optimizado con transformaciones inmutables con traducciones
  readonly experiences = computed(() => 
    this.experienceData().map(exp => ({
      title: `${this.translate('experience.position')} at ${this.translate('experience.company')}`,
      description: `${this.translate('experience.period')} - ${this.translate('experience.description')}`,
      tags: exp.technologies, // ✅ Ya es readonly string[]
      imageUrl: '' // Sin imagen para experiencia
    }))
  );

  // Computed para contar experiencias
  readonly totalExperiences = computed(() => 
    this.experienceData().length
  );

  // Computed para años de experiencia (ejemplo de lógica derivada)
  readonly yearsOfExperience = computed(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2025; // Basado en los datos mock
    return currentYear - startYear;
  });

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}