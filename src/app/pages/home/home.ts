import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import lenis from 'lenis';
import { Particles } from "../../components/particles/particles";
import { HomeAnimation } from "../../components/home-animation/home-animation";
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  imports: [Particles, HomeAnimation, Card],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly animationCompleted = signal(false);
  private readonly animationFadingOut = signal(false);

  featured = {
    title: 'Retro Portfolio',
    imageUrl: '',
    description: 'A minimalist, retro-inspired portfolio built with Angular 19, SSR, and Tailwind v4.',
    link: '#',
    tags: ['Angular', 'Tailwind', 'SSR']
  };
  
  readonly showEntryAnimation = computed(() => 
    !this.animationCompleted()
  );

  readonly isAnimationFadingOut = computed(() => 
    this.animationFadingOut()
  );

  onAnimationFadeOutStarted(): void {
    this.animationFadingOut.set(true);
  }

  onEntryAnimationComplete(): void {
    setTimeout(() => {
      this.animationCompleted.set(true);
    }, 300);
  }
}