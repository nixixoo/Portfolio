import { 
  Component, 
  ChangeDetectionStrategy, 
  Inject, 
  PLATFORM_ID, 
  signal, 
  computed, 
  afterNextRender,
  Injector,
  runInInjectionContext
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
  // Reactive state using signals
  public readonly isHydrated = signal(false);
  private readonly animationPhase = signal<'initial' | 'showing' | 'hiding'>('initial');
  private readonly isBrowser: boolean;

  // Static data
  readonly columns = [1, 2, 3, 4, 5];
  readonly rows = Array.from({ length: 30 });

  // Computed values for better performance
  readonly centerCol = computed(() => Math.floor(this.columns.length / 2));
  readonly centerRow = computed(() => Math.floor(this.rows.length / 2));
  readonly isAnimationActive = computed(() => this.isHydrated() && this.animationPhase() !== 'initial');
  
  readonly shouldShowFadeIn = computed(() => 
    this.animationPhase() === 'showing' && this.isHydrated()
  );
  
  readonly shouldShowFadeOut = computed(() => 
    this.animationPhase() === 'hiding' && this.isHydrated()
  );

  // Nueva computed property para controlar visibilidad del texto
  readonly shouldShowText = computed(() => {
    if (!this.isBrowser) return false;
    return this.isHydrated() && this.animationPhase() !== 'initial';
  });

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private injector: Injector // ← Clave: Inyectamos el Injector
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // 🎯 ENFOQUE 1: Configurar afterNextRender en el constructor
    if (this.isBrowser) {
      afterNextRender(() => {
        this.startAnimationSequence();
      });
    }
  }

  ngAfterViewInit() {
    // 🎯 ENFOQUE 2: Alternativo usando runInInjectionContext
    // Descomenta este bloque si prefieres usar ngAfterViewInit
    /*
    if (!this.isBrowser) return;
    
    runInInjectionContext(this.injector, () => {
      afterNextRender(() => {
        this.startAnimationSequence();
      });
    });
    */
  }

  private startAnimationSequence(): void {
    // Fase 1: Hidratación
    requestAnimationFrame(() => {
      this.isHydrated.set(true);
      
      // Fase 2: Mostrar animación
      setTimeout(() => {
        this.animationPhase.set('showing');
        
        // Fase 3: Ocultar animación
        setTimeout(() => {
          this.animationPhase.set('hiding');
        }, 1300);
      }, 200);
    });
  }
}