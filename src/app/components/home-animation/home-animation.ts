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

@Component({
  selector: 'app-home-animation',
  imports: [],
  templateUrl: './home-animation.html',
  styleUrl: './home-animation.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAnimation {
  animationComplete = output<void>();
  fadeOutStarted = output<void>(); // Nuevo output

  public readonly isHydrated = signal(false);
  private readonly animationPhase = signal<'initial' | 'showing' | 'hiding'>('initial');
  private readonly isBrowser: boolean;

  readonly columns = [1, 2, 3, 4, 5];
  readonly rows = Array.from({ length: 30 });

  readonly centerCol = computed(() => Math.floor(this.columns.length / 2));
  readonly centerRow = computed(() => Math.floor(this.rows.length / 2));
  readonly isAnimationActive = computed(() => this.isHydrated() && this.animationPhase() !== 'initial');
  
  readonly shouldShowFadeIn = computed(() => 
    this.animationPhase() === 'showing' && this.isHydrated()
  );
  
  readonly shouldShowFadeOut = computed(() => 
    this.animationPhase() === 'hiding' && this.isHydrated()
  );

  readonly shouldShowText = computed(() => {
    if (!this.isBrowser) return false;
    return this.isHydrated() && this.animationPhase() !== 'initial';
  });

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      afterNextRender(() => {
        this.startAnimationSequence();
      });
    }
  }

  private startAnimationSequence(): void {
    requestAnimationFrame(() => {
      this.isHydrated.set(true);
      
      setTimeout(() => {
        this.animationPhase.set('showing');
        
        setTimeout(() => {
          this.animationPhase.set('hiding');
          
          // Emitir el evento cuando comience el fade-out
          this.fadeOutStarted.emit();
          
          setTimeout(() => {
            this.animationComplete.emit();
          }, 400);
        }, 1300);
      }, 200);
    });
  }
}