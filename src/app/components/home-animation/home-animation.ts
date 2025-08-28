import { 
  Component, 
  ChangeDetectionStrategy, 
  Inject, 
  PLATFORM_ID, 
  signal, 
  computed, 
  afterNextRender,
  output
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Home animation component with grid-based fade in/out effect
@Component({
  selector: 'app-home-animation',
  imports: [],
  templateUrl: './home-animation.html',
  styleUrl: './home-animation.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAnimation {
  animationComplete = output<void>(); // Emitted when animation completes
  fadeOutStarted = output<void>(); // Emitted when fade out begins

  public readonly isHydrated = signal(false); // Client-side hydration state
  private readonly animationPhase = signal<'initial' | 'showing' | 'hiding'>('initial'); // Current animation phase
  private readonly isBrowser: boolean; // Browser environment check

  readonly columns = [1, 2, 3, 4, 5]; // Grid column indices
  readonly rows = Array.from({ length: 30 }); // Grid row array

  readonly centerCol = computed(() => Math.floor(this.columns.length / 2)); // Center column index
  readonly centerRow = computed(() => Math.floor(this.rows.length / 2)); // Center row index
  readonly isAnimationActive = computed(() => this.isHydrated() && this.animationPhase() !== 'initial'); // Animation active state
  
  // Show fade in animation when in showing phase
  readonly shouldShowFadeIn = computed(() => 
    this.animationPhase() === 'showing' && this.isHydrated()
  );
  
  // Show fade out animation when in hiding phase
  readonly shouldShowFadeOut = computed(() => 
    this.animationPhase() === 'hiding' && this.isHydrated()
  );

  // Show text when animation is active and in browser
  readonly shouldShowText = computed(() => {
    if (!this.isBrowser) return false;
    return this.isHydrated() && this.animationPhase() !== 'initial';
  });

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); // Check if running in browser
    
    if (this.isBrowser) {
      afterNextRender(() => {
        this.startAnimationSequence(); // Start animation after render
      });
    }
  }

  // Start the animation sequence with timing
  private startAnimationSequence(): void {
    requestAnimationFrame(() => {
      this.isHydrated.set(true);
      
      setTimeout(() => {
        this.animationPhase.set('showing');
        
        setTimeout(() => {
          this.animationPhase.set('hiding');
          
          this.fadeOutStarted.emit();
          
          setTimeout(() => {
            this.animationComplete.emit();
          }, 400);
        }, 1300);
      }, 200);
    });
  }
}