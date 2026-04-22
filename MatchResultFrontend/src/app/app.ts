import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResultComponent } from "./result-component/result-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MatchResultFrontend');
}
