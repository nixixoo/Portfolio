import { Component, ChangeDetectionStrategy } from '@angular/core';
import lenis from 'lenis';
import { Particles } from "../../components/particles/particles";

@Component({
  selector: 'app-home',
  imports: [Particles],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}
