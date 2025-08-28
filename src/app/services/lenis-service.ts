import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { PLATFORM_ID } from '@angular/core';

// Service for managing Lenis smooth scrolling with custom scrollbar
@Injectable({
  providedIn: 'root',
})
export class LenisService implements OnDestroy {
  private lenis: Lenis | null = null; // Lenis instance
  private isDragging = false; // Scrollbar drag state
  private startY = 0; // Initial mouse Y position
  private startTop = 0; // Initial scrollbar thumb position

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {} // Platform check for SSR

  // Initialize Lenis smooth scrolling with custom scrollbar
  // Initialize Lenis smooth scrolling with custom scrollbar
  init(): void {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server side

    if (this.lenis) {
      this.destroy(); // Clean up existing instance
    }

    // Configure Lenis with smooth scrolling settings
    this.lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      duration: 1.2,
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Get custom scrollbar elements
    const track = document.querySelector<HTMLElement>('#custom-scrollbar');
    const thumb = document.querySelector<HTMLElement>('#custom-scrollbar .scrollbar-thumb');

    if (!track || !thumb) return; // Exit if scrollbar elements not found


    
    // Update scrollbar thumb position on scroll
    this.lenis.on('scroll', ({ scroll, limit }) => {
      if (this.isDragging) return; // Don't update during drag
      const progress = scroll / limit;
      const trackHeight = track.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      const available = trackHeight - thumbHeight;
      thumb.style.top = `${progress * available}px`;
    });

    // Start scrollbar drag on mouse down
    thumb.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.startTop = parseFloat(thumb.style.top || '0');
    });

    // Handle scrollbar dragging
    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.lenis) return;

      const trackHeight = track.offsetHeight;
      const thumbHeight = thumb.offsetHeight;
      const available = trackHeight - thumbHeight;

      const deltaY = e.clientY - this.startY;
      let newTop = this.startTop + deltaY;
      newTop = Math.max(0, Math.min(newTop, available)); // Constrain to track bounds

      thumb.style.top = `${newTop}px`;

      const newProgress = newTop / available;
      this.lenis.scrollTo(newProgress * this.lenis.limit, { immediate: true });
    });

    // End scrollbar drag on mouse up
    document.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
      }
    });
  }

  // Clean up Lenis instance
  destroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }

  // Reinitialize Lenis with delay
  reinitialize(): void {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server side
    
    setTimeout(() => {
      this.destroy();
      this.init();
    }, 50);
  }

  // Get current Lenis instance
  getLenis(): Lenis | null {
    return this.lenis;
  }

  // Clean up on service destruction
  ngOnDestroy(): void {
    this.destroy();
  }
}
