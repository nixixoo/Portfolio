import { Component, Signal, ChangeDetectionStrategy, AfterViewInit, viewChild, ElementRef, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


interface Particle {
  x: number; // position
  y: number; // position
  size: number; // size on pixel
  speedY: number; // speed on Y
  driftX: number; // tiny X movement
  opacity: number; // to give disappearing effect
}

@Component({
  selector: 'app-particles',
  imports: [],
  templateUrl: './particles.html',
  styleUrls: ['./particles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Particles implements AfterViewInit {
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  color = ""

  private fadeZoneHeight = signal(0.50); // top 50% of canvas will have fade effect
  private fadeIntensity = signal(1.0); // 1.0 = full fade, 0.0 = no fade

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // canvas context & good look on all screens
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const styles = getComputedStyle(document.documentElement);
    const color = styles.getPropertyValue("--color-yellow").trim();
    this.color = color;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // initialize particles
    for (let i = 0; i < 75; i++) {
      this.particles.push(this.spawn(w, h, true));
    }

    const loop = () => {
      this.drawParticles(ctx, w, h);
      requestAnimationFrame(loop);
    };
    loop();

  }
 
  // configure fade zone
  configureFadeZone(heightPercentage: number): void {
    this.fadeZoneHeight.set(Math.max(0.1, Math.min(0.5, heightPercentage)));
  }

  // configure fade intensity
  setFadeIntensity(intensity: number): void {
    this.fadeIntensity.set(Math.max(0, Math.min(1, intensity)));
  }

  // create particles
  private spawn(width: number, height: number, isInitial: boolean = false): Particle {
    const size = 4 + Math.random() * 3; // between 4 and 7 pixels
    const x = Math.random() * width; // X position randomly
    const y = isInitial ? Math.random() * height : height; // always appears on the bottom of the canvas
    const speedY = 0.5 + Math.random() * 1; // goes upwards between 1 and 2 px per frame
    const driftX = (Math.random() - 0.5) * 0.5; // tiny X movement
    const opacity = 0.7 + Math.random() * 0.3; // between 0.7 and 1
    return { x, y, size, speedY, driftX, opacity };
  }
 
  // calculate particle opacity
  private calculateParticleOpacity(particle: Particle, canvasHeight: number): number {
    const fadeZone = canvasHeight * this.fadeZoneHeight();
    const fadeIntensity = this.fadeIntensity();
    
    // if particle is below fade zone, use full opacity
    if (particle.y > fadeZone) {
      return particle.opacity;
    }
    
    // calculate fade progress for particles in fade zone
    // fadeProgress: 1.0 at fadeZone boundary, 0.0 at top of canvas
    const fadeProgress = Math.max(0, particle.y / fadeZone);
    
    // apply fade intensity to the fade effect
    const fadeMultiplier = fadeProgress + (1 - fadeProgress) * (1 - fadeIntensity);
    
    return particle.opacity * fadeMultiplier;
  }

  // draw particles
  private drawParticles(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.color;
    
    for (let p of this.particles) {
      // update position
      p.y -= p.speedY;
      p.x += p.driftX;

      // if the particle get out of the canvas, it restarts at the bottom
      if (p.y + p.size < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }

      const finalOpacity = this.calculateParticleOpacity(p, height);

      // draw particle
      ctx.globalAlpha = finalOpacity;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.globalAlpha = 1; // reset opacity to not affect the next one
  }
}
