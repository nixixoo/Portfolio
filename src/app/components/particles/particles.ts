import { Component, Signal, ChangeDetectionStrategy, AfterViewInit, viewChild, ElementRef, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


// Particle data structure for animation
interface Particle {
  x: number; // X position
  y: number; // Y position
  size: number; // Particle size in pixels
  speedY: number; // Vertical movement speed
  driftX: number; // Horizontal drift movement
  opacity: number; // Particle opacity
}

// Particle animation component with canvas-based floating particles
@Component({
  selector: 'app-particles',
  imports: [],
  templateUrl: './particles.html',
  styleUrls: ['./particles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Particles implements AfterViewInit {
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {} // Platform check for SSR

  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas'); // Canvas element reference
  private ctx!: CanvasRenderingContext2D; // Canvas 2D context
  private particles: Particle[] = []; // Array of particles
  color = "" // Particle color from CSS variable

  private fadeZoneHeight = signal(0.50); // Height percentage for fade effect
  private fadeIntensity = signal(1.0); // Intensity of fade effect

  // Initialize canvas and start particle animation
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
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

    for (let i = 0; i < 75; i++) {
      this.particles.push(this.spawn(w, h, true));
    }

    const loop = () => {
      this.drawParticles(ctx, w, h);
      requestAnimationFrame(loop);
    };
    loop();

  }
 
  // Configure the fade zone height percentage
  configureFadeZone(heightPercentage: number): void {
    this.fadeZoneHeight.set(Math.max(0.1, Math.min(0.5, heightPercentage)));
  }

  // Set the fade effect intensity
  setFadeIntensity(intensity: number): void {
    this.fadeIntensity.set(Math.max(0, Math.min(1, intensity)));
  }

  // Create a new particle with random properties
  private spawn(width: number, height: number, isInitial: boolean = false): Particle {
    const size = 4 + Math.random() * 3;
    const x = Math.random() * width;
    const y = isInitial ? Math.random() * height : height;
    const speedY = 0.5 + Math.random() * 1;
    const driftX = (Math.random() - 0.5) * 0.5;
    const opacity = 0.7 + Math.random() * 0.3;
    return { x, y, size, speedY, driftX, opacity };
  }
 
  // Calculate particle opacity based on fade zone
  private calculateParticleOpacity(particle: Particle, canvasHeight: number): number {
    const fadeZone = canvasHeight * this.fadeZoneHeight();
    const fadeIntensity = this.fadeIntensity();
    
    if (particle.y > fadeZone) {
      return particle.opacity;
    }
    
    const fadeProgress = Math.max(0, particle.y / fadeZone);
    const fadeMultiplier = fadeProgress + (1 - fadeProgress) * (1 - fadeIntensity);
    
    return particle.opacity * fadeMultiplier;
  }

  // Draw all particles on canvas with fade effects
  private drawParticles(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.color;
    
    for (let p of this.particles) {
      p.y -= p.speedY;
      p.x += p.driftX;

      if (p.y + p.size < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }

      const finalOpacity = this.calculateParticleOpacity(p, height);
      ctx.globalAlpha = finalOpacity;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.globalAlpha = 1;
  }
}
