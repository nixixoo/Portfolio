import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LenisService } from './services/lenis-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private lenisService: LenisService) {}
  protected readonly title = signal('Portfolio');

  ngOnInit(): void {
    this.lenisService.init();
  }
}
