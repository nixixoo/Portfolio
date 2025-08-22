import {
  Component,
  Signal,
  ChangeDetectionStrategy,
  AfterViewInit,
  viewChild,
  ElementRef,
} from '@angular/core';

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
  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];

  color = ""

  ngAfterViewInit(): void {
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
    for (let i = 0; i < 50; i++) {
      this.particles.push(this.spawn(w, h));
    }

    const loop = () => {
      this.drawParticles(ctx, w, h);
      requestAnimationFrame(loop);
    };
    loop();
  }

  // create particles
  private spawn(width: number, height: number): Particle {
    const size = 2 + Math.random() * 3; // between 2 and 5 pixels
    const x = Math.random() * width; // X position randomly
    const y = height; // always appears on the bottom of the canvas
    const speedY = 1 + Math.random() * 1; // goes upwards between 1 and 2 px per frame
    const driftX = (Math.random() - 0.5) * 0.5; //tiny X movement
    const opacity = 0.7 * Math.random() * 0.3; // between 0.7 and 1

    return { x, y, size, speedY, driftX, opacity };
  }

  // draw particles
  private drawParticles(ctx: CanvasRenderingContext2D, widht: number, height: number) {
    ctx.clearRect(0, 0, widht, height);
    ctx.fillStyle = 'red';

    for (let p of this.particles) {
      // update position
      p.y -= p.speedY;
      p.x += p.driftX;

      // if the particle get out of the canvas, it restarts at the bottom
      if (p.y + p.size < 0) {
        p.y = height;
        p.x = Math.random() * widht;
      }

      // draw particle
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.globalAlpha = 1; // reset opacity to not affect the next one
  }
}
