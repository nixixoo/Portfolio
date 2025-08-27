import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Card } from '../card/card';

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

  // ✅ Computed optimizado con transformaciones inmutables
  readonly experiences = computed(() => 
    this.experienceData().map(exp => ({
      title: `${exp.position} at ${exp.company}`,
      description: `${exp.period} - ${exp.description}`,
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
}