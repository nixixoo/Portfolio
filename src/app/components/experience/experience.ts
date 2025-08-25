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
      id: 'current-role',
      company: 'Tech Innovation Co.',
      position: 'Senior Frontend Developer',
      period: '2023 - Present',
      description: 'Leading frontend development initiatives using Angular, implementing modern reactive patterns with signals, and mentoring junior developers on best practices.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Tailwind'],
      companyUrl: 'https://techinnovation.com'
    },
    {
      id: 'previous-role',
      company: 'Digital Solutions Ltd.',
      position: 'Full Stack Developer',
      period: '2021 - 2023',
      description: 'Developed responsive web applications, integrated RESTful APIs, and collaborated with cross-functional teams to deliver high-quality software solutions.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Docker'],
      companyUrl: 'https://digitalsolutions.com'
    },
    {
      id: 'junior-role',
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      period: '2020 - 2021',
      description: 'Built user interfaces for web applications, learned modern development practices, and contributed to code reviews and testing processes.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Git']
    }
  ]);

  // ✅ Computed optimizado con transformaciones inmutables
  readonly experiences = computed(() => 
    this.experienceData().map(exp => ({
      title: `${exp.position} at ${exp.company}`,
      description: `${exp.period} - ${exp.description}`,
      tags: exp.technologies, // ✅ Ya es readonly string[]
      link: exp.companyUrl ?? '', // ✅ Usar nullish coalescing
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
    const startYear = 2020; // Basado en los datos mock
    return currentYear - startYear;
  });
}