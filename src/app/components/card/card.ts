import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  readonly title = input<string>('');
  readonly imageUrl = input<string>('');
  readonly description = input<string>('');
  readonly link = input<string>('');
  readonly tags = input<string[]>([]);
}
