import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LenisService implements OnDestroy {
  private lenis: Lenis | null = null;
  private isDragging = false;
  private startY = 0;
  private startTop = 0;

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

    const track = document.querySelector<HTMLElement>('#custom-scrollbar');
    const thumb = document.querySelector<HTMLElement>('#custom-scrollbar .scrollbar-thumb');

    if (!track || !thumb) return;

    // --- Sync thumb con Lenis ---
    this.lenis.on('scroll', ({ scroll, limit }) => {
      if (this.isDragging) return; // si estoy arrastrando, no sobreescribas
      const progress = scroll / limit;
      const trackHeight = track.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      const available = trackHeight - thumbHeight;
      thumb.style.top = `${progress * available}px`;
    });

    // --- Eventos drag ---
    thumb.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.startTop = parseFloat(thumb.style.top || '0');
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.lenis) return;

      const trackHeight = track.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      const available = trackHeight - thumbHeight;

      const deltaY = e.clientY - this.startY;
      let newTop = this.startTop + deltaY;
      newTop = Math.max(0, Math.min(newTop, available));

      thumb.style.top = `${newTop}px`;

      const newProgress = newTop / available;
      this.lenis.scrollTo(newProgress * this.lenis.limit, { immediate: true });
    });

    document.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        document.body.style.userSelect = '';
      }
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
