import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import lenis from 'lenis';
import { Particles } from "../../components/particles/particles";
import { HomeAnimation } from "../../components/home-animation/home-animation";

@Component({
  selector: 'app-home',
  imports: [Particles, HomeAnimation],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly animationCompleted = signal(false);
  private readonly animationFadingOut = signal(false);
  
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
    // Pequeño delay para permitir que la transición CSS termine
    setTimeout(() => {
      this.animationCompleted.set(true);
    }, 300); // Debe coincidir con la duración de la transición CSS
  }
}