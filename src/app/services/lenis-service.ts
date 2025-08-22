import { Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root',
})
export class LenisService implements OnDestroy {
  private lenis: Lenis | null = null;

  constructor() {}

  init() {
    if (this.lenis) {
      this.destroy();
    }

    this.lenis = new Lenis({
      autoRaf: true, // lenis controlls automatically the loop animation
      lerp: 0.1, // controls speed, 0.1 smoother 1 direct
      duration: 1.2, // controls duration of scroll
      orientation: 'vertical', // scroll direction
      smoothWheel: true, // smooth mouse wheel
    });
  }

destroy() {
  if (this.lenis) {
    this.lenis.destroy();
    this.lenis = null;
  }
}

  ngOnDestroy(): void {
    this.destroy();
  }
}
