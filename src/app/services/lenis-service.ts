import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LenisService implements OnDestroy {
  private lenis: Lenis | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.lenis) {
      this.destroy();
    }

    this.lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      duration: 1.2,
      orientation: 'vertical',
      smoothWheel: true,
    });
  }

  destroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }

  getLenis(): Lenis | null {
    return this.lenis;
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}