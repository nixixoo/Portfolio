import { Component, input } from '@angular/core';

/**
 * 🎯 CARD COMPONENT: Pure Presentation Component
 * 
 * DESIGN PRINCIPLES:
 * - Data agnostic: Works with any data source
 * - Reusable: Projects, Experience, Blog posts, etc.
 * - Immutable: Accepts readonly data, no mutations
 * - Type-safe: Strong typing prevents runtime errors
 */
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  /**
   * 📝 INPUT SIGNALS: Modern Angular pattern
   * 
   * Why input() over @Input():
   * - Better TypeScript inference
   * - Automatic change detection optimization  
   * - Reactive by default
   * - Composable with computed()
   */
  readonly title = input<string>('');
  readonly imageUrl = input<string>('');  
  readonly description = input<string>('');
  readonly link = input<string>('');
  
  /**
   * 🔧 CRITICAL FIX: readonly string[] type
   * 
   * Why readonly?
   * - Prevents accidental mutations within component
   * - Compatible with both mutable and readonly arrays
   * - Signals immutability intent to other developers
   * - Enables better Angular optimizations
   */
  readonly tags = input<readonly string[]>([]);
}

/**
 * 📚 ARCHITECTURAL LESSONS:
 * 
 * 1. SINGLE RESPONSIBILITY PRINCIPLE:
 *    Card ONLY handles presentation logic
 *    Data transformation happens in parent components
 * 
 * 2. DEPENDENCY INVERSION PRINCIPLE:  
 *    Card depends on abstractions (input properties)
 *    Not concrete implementations (specific services)
 * 
 * 3. OPEN/CLOSED PRINCIPLE:
 *    Open for extension via input properties
 *    Closed for modification (stable interface)
 * 
 * 4. COMPOSITION OVER INHERITANCE:
 *    Components compose Card with different data
 *    No need for CardBase, ProjectCard, ExperienceCard etc.
 */